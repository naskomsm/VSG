# VSG

Swagger is located on localhost:7186/api
Angular is located on localhost:80

1. Generate certificates locally

   dotnet dev-certs https --clean

   dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p very_good_password

   dotnet dev-certs https --trust

2. Run containers

   docker compose up -d
