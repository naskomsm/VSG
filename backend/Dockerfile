FROM mcr.microsoft.com/dotnet/sdk:8.0 as build

COPY *.sln .
COPY /src/Api/Api.csproj ./src/Api/
COPY /src/Application/Application.csproj ./src/Application/
COPY /src/Domain/Domain.csproj ./src/Domain/
COPY /src/Infrastructure/Infrastructure.csproj ./src/Infrastructure/

COPY . .

WORKDIR /src/Api
RUN dotnet build -c Release -o /app
RUN dotnet publish "Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app/publish
COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "Api.dll"]