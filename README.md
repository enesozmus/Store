## webapi
```
  dotnet restore
	dotnet build

	docker compose up -d

	dotnet ef migrations add InitialCreate -s Jardani.API -p Jardani.Infrastructure -o EFCore/Migrations

	dotnet ef database update -s Jardani.API -p Jardani.Infrastructure
```

### webapi/API
```
  dotnet watch
```

## client
```
	npm install
	ng serve -o
```
