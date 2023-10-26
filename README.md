# noc-cc

The goal is to create an application that performs a series of tasks every so often using clean architecture with Typescript

# dev

1. Clone .env.template file to .env
2. Configure environment variables
3. Execute `npm install`
4. Up database with the command

```
  docker compose up -d
```

5. Ejectuar el comando

```
  npx prisma migrate dev
```

6. Execute `npm run dev`
