document.addEventListener('DOMContentLoaded', () => {
    const username = 'your-github-username';
    
    // Fetch GitHub profile data
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            updateProfile(data);
        })
        .catch(error => console.error('Error:', error));
    
    // Fetch repositories
    fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`)
        .then(response => response.json())
        .then(data => {
            updateRepositories(data);
        })
        .catch(error => console.error('Error:', error));
});

function updateProfile(data) {
    document.querySelector('.profile-info h2').textContent = data.name || data.login;
    document.querySelector('.profile-info .bio').textContent = data.bio || '';
    document.querySelector('.github-stats').innerHTML = `
        <span><i class="fas fa-code-branch"></i> Repositories: <strong>${data.public_repos}</strong></span>
        <span><i class="fas fa-users"></i> Followers: <strong>${data.followers}</strong></span>
        <span><i class="fas fa-star"></i> Following: <strong>${data.following}</strong></span>
    `;
}

function updateRepositories(repos) {
    const reposGrid = document.querySelector('.repos-grid');
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'project-card';
        repoCard.innerHTML = `
            <div class="project-content">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <div class="project-tech">
                    <span>${repo.language || 'N/A'}</span>
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
                <a href="${repo.html_url}" class="btn primary" target="_blank">View Repository</a>
            </div>
        `;
        reposGrid.appendChild(repoCard);
    });
} 