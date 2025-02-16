const username = "LucasEineckMachado"; // Seu nome de usuário do GitHub
const token = "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"; // Seu token de acesso

// Função para buscar dados do GitHub
async function fetchGitHubData() {
    try {
        // Buscar informações do usuário
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        const userData = await userResponse.json();

        // Buscar repositórios públicos
        const reposResponse = await fetch(userData.repos_url, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        const reposData = await reposResponse.json();

        // Buscar gists (Pens)
        const gistsResponse = await fetch(`https://api.github.com/users/${username}/gists`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        const gistsData = await gistsResponse.json();

        // Buscar eventos públicos (contribuições recentes)
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        const eventsData = await eventsResponse.json();

        // Atualizar os dados no HTML
        document.querySelector(".followers").textContent = userData.followers; // Seguidores
        document.querySelector(".ds.pens p").textContent = gistsData.length; // Pens (gists)
        document.querySelector(".ds.projects p").textContent = reposData.length; // Projects (repositórios)
        document.querySelector(".ds.posts p").textContent = eventsData.filter(event => event.type === "PushEvent").length; // Posts (contribuições)
    } catch (error) {
        console.error("Erro ao buscar dados do GitHub:", error);
    }
}

// Executa a função ao carregar a página
window.onload = fetchGitHubData;

// Adicionando funcionalidade para porcentagem dinâmica nas barras de skills usando HTML, CSS e JavaScript.
// O JavaScript agora percorre todas as barras de skill e anima a porcentagem preenchida.
document.addEventListener("DOMContentLoaded", function() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const percentage = bar.dataset.percentage;
        bar.style.width = `${percentage}%`;  // Preenche a barra conforme a porcentagem
    });
});


