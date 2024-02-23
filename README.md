# VSG

MySQL is used because the development environment was on macOS and SQL Server is a pain there.

Swagger is located on localhost:7186/api

Angular is located on localhost:80

If you want to start the applications with containers do the following:

1. Generate certificates locally

   dotnet dev-certs https --clean

   dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p very_good_password

   dotnet dev-certs https --trust

2. Run containers

   docker compose up -d

If you want to start applications without containers do the following:

Angular

1. Go to frontend/BinanceCharts
2. npm install
3. ng serve
   (Running on port 4200)

API

1. Go to backend
2. dotnet run --project src/Api/Api.csproj (Running on port 7186)
