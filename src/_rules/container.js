import { warnOnce } from '@unocss/core';
export const containerParent = [
    [/^@container(?:\/(\w+))?(?:-(normal))?$/, ([, l, v]) => {
            warnOnce('The container query rule is experimental and may not follow semver.');
            return {
                'container-type': v ?? 'inline-size',
                'container-name': l,
            };
        }],
];
