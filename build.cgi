#!/usr/bin/bash

echo "Content-type: text/html"
echo ""
echo "<html><body>"
echo "<p>Hello, World. My name is $(whoami). I am in the $(pwd) directory.</p>"
cd /home/deployemon/website-source
echo "<p>I'm changing directories. Now I am in the $(pwd) directory.</p>"
echo "<p>Here is the directory listing: <pre>$(ls -hal)</pre></p>"
echo "<p>I'm pulling from github:</p>"
eval $(ssh-agent -s) && ssh-add ~/.ssh/id_github
echo "<p><pre>$(git reset --hard origin/main)</pre></p>"
echo "<p><pre>$(git pull)</pre></p>"
echo "<p>Time for some npm scripts:</p>"
echo "<pre>$(npm run lint)</pre>"
echo "<pre>$(npm run publish)</pre>"
echo "<p>Goodbye!</p>"
echo "</body></html>"
