export class ApiUrl {
    static base = "/api/v1";
    static getRepos = "/api/v1/repositorys";
    static addRepos = "/api/repositorys";
    static reposBase = "/api/repositorys";
    static searchArgifact = "api/repositorys/{repoCode}/artifacts/search";
    static argifactDetails = "api/repositorys/{repoCode}/artifacts/{argifactName}";
    static argifactVersions = "api/repositorys/{repoCode}/artifacts/{argifactName}/versions";
    static getTag = "api/tags/{name}";
}