#!/usr/bin/bash

LOG_PREFIX=$(echo "[$(date -u +'%Y-%m-%d @ %T %Z')] User Agent: $HTTP_USER_AGENT // IP Address: $REMOTE_ADDR //")
if [ "$REQUEST_METHOD" = "POST" ] && [ "$CONTENT_LENGTH" -gt 0 ]; then
    raw=$(echo -n "`cat`");
    BUILD_KEY=$(echo -n `grep -o 'BUILD_KEY=.*' /home/deployemon/website-source/.env | cut -d '=' -f 2`)
    if [ "$BUILD_KEY" = "$raw" ]; then
        echo "Content-type: text/plain"
        echo ""
        cd /home/deployemon/website-source
        eval $(ssh-agent -s) > /dev/null && ssh-add ~/.ssh/id_github > /dev/null
        git reset --hard origin/main > /dev/null
        git pull > /dev/null
        nice -n 10 npm run --silent publish > /dev/null
        echo -e "$LOG_PREFIX Succeeded" >> /var/log/build_requests.log
        echo "Build triggered on $(TZ=America/New_York date +'%Y-%m-%d at %H:%M %Z') $(date -u +'(%H:%M UTC)')"
    else
        echo -e "$LOG_PREFIX FAILED with invalid authorization: \"$raw\"" >> /var/log/build_requests.log
        echo "Status: 403 Forbidden"
        echo ""
    fi
else
    echo -e "$LOG_PREFIX FAILED with invalid request type: \"$REQUEST_METHOD\"" >> /var/log/build_requests.log
    echo "Status: 400 Bad Request"
    echo ""
fi
