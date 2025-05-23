import * as pageDetect from 'github-url-detection';

import {isRefinedGitHubRepo} from '../github-helpers/index.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

// Source: https://github.com/fregante/release-with-changelog/blob/779fd5e658f82e5b11b1c0a352a6838d3bd8f67f/generate-release-notes.js#L6
const excludePreset = /^bump |^meta|^document|^lint|^refactor|readme|dependencies|^v?\d+\.\d+\.\d+/i;

function dim(commitTitle: HTMLElement): void {
	if (excludePreset.test(commitTitle.textContent.trim())) {
		commitTitle.closest('[data-testid="commit-row-item"]')!.style.opacity = '50%';
	}
}

function init(signal: AbortSignal): void {
	observe('[data-testid="commit-row-item"] .markdown-title span', dim, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isRefinedGitHubRepo,
	],
	include: [
		pageDetect.isCommitList,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/commits/98fb24e53704b436d68f254429885fb7bef09541/source/features/bypass-checks.tsx

*/
