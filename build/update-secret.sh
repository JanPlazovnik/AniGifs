docker service rm anigifs_app
docker secret rm anigifs_env
docker secret create anigifs_env .env
