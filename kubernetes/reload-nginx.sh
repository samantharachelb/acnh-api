nginx "$@"

oldcksum=`cksum /etc/nginx/conf.d/default.conf`
inotifywait -e modify,move,create,delete -mr -timefmt '%d/%m/%y %H:%M' --format '%T' /etc/nginx/conf.d/ | while read data time; do
  newcksum=`cksum /etc/nginx/conf.d/default.conf`
  if [ "$newcksum" != "$oldcksum" ]; then
    echo "At ${time} on ${date}, config file update detected."
    oldcksum=$newcksum
    nginx -s reload
  fi
done
