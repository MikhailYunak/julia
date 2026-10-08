import { createProjectGraphAsync } from '@nx/devkit';

/**
 * Module-boundary enforcement without ESLint. Walks the Nx project graph
 * and checks every internal dependency edge against two independent rule
 * sets — which `scope:*` tags a project may depend on, and which `type:*`
 * tags it may depend on — mirroring the tables in the plan doc.
 *
 * A project with no scope/type tag is exempt from that dimension's check
 * (so untagged root-level tooling doesn't need fake tags), but every
 * app/lib generated for this project should carry both.
 */

const SCOPE_RULES: Record<string, string[]> = {
  'scope:shared': ['scope:shared'],
  'scope:api': ['scope:api', 'scope:shared'],
  'scope:manager': ['scope:manager', 'scope:shared'],
  'scope:partner': ['scope:partner', 'scope:shared'],
};

const TYPE_RULES: Record<string, string[]> = {
  // Apps and e2e suites sit above the library graph: they may depend on
  // any type, as long as the scope rule above still allows the edge.
  'type:app': ['type:feature', 'type:data-access', 'type:ui', 'type:util'],
  'type:e2e': [
    'type:app',
    'type:feature',
    'type:data-access',
    'type:ui',
    'type:util',
  ],
  'type:feature': ['type:feature', 'type:data-access', 'type:ui', 'type:util'],
  'type:data-access': ['type:data-access', 'type:util'],
  'type:ui': ['type:ui', 'type:util'],
  'type:util': ['type:util'],
};

function findTag(tags: string[], prefix: string): string | undefined {
  return tags.find((tag) => tag.startsWith(prefix));
}

async function main() {
  const graph = await createProjectGraphAsync();
  const violations: string[] = [];

  for (const [projectName, dependencies] of Object.entries(
    graph.dependencies,
  )) {
    const sourceNode = graph.nodes[projectName];
    if (!sourceNode) continue; // shouldn't happen, but be defensive

    const sourceTags = sourceNode.data.tags ?? [];
    const sourceScope = findTag(sourceTags, 'scope:');
    const sourceType = findTag(sourceTags, 'type:');

    for (const dep of dependencies) {
      if (dep.type === 'implicit') continue; // e.g. e2e -> its own app

      const targetNode = graph.nodes[dep.target];
      if (!targetNode) continue; // external (npm) dependency, not ours to police

      const targetTags = targetNode.data.tags ?? [];
      const targetScope = findTag(targetTags, 'scope:');
      const targetType = findTag(targetTags, 'type:');

      if (sourceScope && targetScope) {
        const allowed = SCOPE_RULES[sourceScope] ?? [];
        if (!allowed.includes(targetScope)) {
          violations.push(
            `${projectName} (${sourceScope}) must not depend on ${dep.target} (${targetScope})`,
          );
        }
      }

      if (sourceType && targetType) {
        const allowed = TYPE_RULES[sourceType] ?? [];
        if (!allowed.includes(targetType)) {
          violations.push(
            `${projectName} (${sourceType}) must not depend on ${dep.target} (${targetType})`,
          );
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error(`Found ${violations.length} module boundary violation(s):\n`);
    for (const violation of violations) {
      console.error(`  ✗ ${violation}`);
    }
    process.exit(1);
  }

  console.log('No module boundary violations found.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
