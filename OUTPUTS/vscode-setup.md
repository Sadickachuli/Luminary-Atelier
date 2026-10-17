# Running the Luminary build in VS Code with Claude Code (Windows)

## One-time setup
1. **Install VS Code** from code.visualstudio.com if you don't have it.
2. **Install Node.js LTS** from nodejs.org (accept the defaults). Claude Code uses it to serve the site locally and take screenshots. Close and reopen VS Code afterwards.
3. **Install Git for Windows** from git-scm.com (defaults are fine). This lets you undo anything Claude Code does.
4. In VS Code, open Extensions (`Ctrl+Shift+X`), search **Claude Code**, and install the one published by **Anthropic**. Sign in with your Claude account when it asks.

## Open the project
1. **File > Open Folder** and choose `C:\Users\hp\Celebrate-Sweetly-Luminary`. Click "Yes, I trust the authors" if asked.
2. Open Claude Code: click the Claude (spark) icon in the top-right of the editor, or press `Ctrl+Esc`.
3. Claude Code automatically reads `CLAUDE.md` in the folder root, so it knows the rules (no em dashes, don't touch ASSETS, ask before deleting) before you type anything.
4. Type `/model` and pick Opus for the build.

## First prompt (paste exactly)

> Read CLAUDE.md, then read OUTPUTS/prompts/01-build-site.md and every file it references. Before writing any code: run `git init` and commit the folder as it is now, so we can undo anything. Then give me your plan: the order you'll build in, which library versions you'll vendor, and anything in the prompt or design direction that is unclear or contradicts itself. Wait for my go-ahead before building.

Read the plan. If it looks right, reply **"Go ahead."** If not, correct it in plain words.

## While it works
- It will ask permission before running commands. Read each one. Approve server, screenshot, npm and git commands. Refuse anything that deletes files or touches `ASSETS/`, `CONTENT/` or `CLIENT/`.
- To see the site, ask: "Start the local server and give me the link." Open it in your browser.
- If something looks off, say what you see, not how to fix it: "The philosophy text lights up too fast" works better than CSS advice.
- When a step is done and you're happy, ask it to commit: "Commit this with a clear message."

## When it finishes
- Check `BUILD/luminary/TBC-LIST.md` for everything still waiting on Merley.
- Check `BUILD/luminary/_review/` for the screenshots.
- Nothing goes live until the platform decision and the Formspree form are sorted.
