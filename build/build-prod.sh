docker build -f build/Dockerfile -t anigifs .
docker stack deploy --prune --compose-file build/stack.prod.yml anigifs
