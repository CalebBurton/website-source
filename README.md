# calebburton.com

Source code for my GitHub Pages website

Here are a few commands for my own reference to make deployment less painful:

- <https://medium.com/@v/git-subtrees-a-tutorial-6ff568381844>
- `git subtree push --prefix=build output-subtree master`
- `cd /Users/calebburton/Documents/GitHub/calebburton.com/static` (switch to the css folder)
- `node-sass -w sass -o css` (watch for changes to the scss files and update the css accordingly)

Good info about `gh-pages` branch comes from [this gist](https://gist.github.com/cobyism/4730490)
Git submodules: <https://www.vogella.com/tutorials/GitSubmodules/article.html#submodules_adding>
