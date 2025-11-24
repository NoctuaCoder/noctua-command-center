export function initPlayer() {
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const visualizerBars = document.querySelectorAll('.bar');

    // Playlist - Using copyright-free music sources (e.g., from public CDNs or placeholders)
    // For this demo, we'll use some reliable MP3 links.
    const playlist = [
        {
            title: "Cyber City",
            artist: "Synthwave Boy",
            url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/KieLoKaz/Free_Ganymed/KieLoKaz_-_01_-_Reunion_of_the_Spirits.mp3" // Placeholder
        },
        {
            title: "Neon Dreams",
            artist: "Lofi Girl",
            url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Elipses.mp3" // Placeholder
        },
        {
            title: "Night Drive",
            artist: "Retrowave",
            url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Ketsa/Raising_Frequencies/Ketsa_-_10_-_Wounds.mp3" // Placeholder
        }
    ];

    let currentindex = 0;
    let isPlaying = false;
    const audio = new Audio();
    audio.src = playlist[currentindex].url;

    function loadTrack(index) {
        audio.src = playlist[index].url;
        trackTitle.textContent = playlist[index].title;
        trackArtist.textContent = playlist[index].artist;
        progressBar.style.width = '0%';
        if (isPlaying) audio.play();
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = '▶';
            stopVisualizer();
        } else {
            audio.play();
            playBtn.textContent = '⏸';
            startVisualizer();
        }
        isPlaying = !isPlaying;
    }

    function nextTrack() {
        currentindex = (currentindex + 1) % playlist.length;
        loadTrack(currentindex);
    }

    function prevTrack() {
        currentindex = (currentindex - 1 + playlist.length) % playlist.length;
        loadTrack(currentindex);
    }

    function updateProgress() {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percent}%`;
        }
    }

    // Visualizer Animation
    let visualizerInterval;
    function startVisualizer() {
        visualizerInterval = setInterval(() => {
            visualizerBars.forEach(bar => {
                const height = Math.random() * 100;
                bar.style.height = `${height}%`;
            });
        }, 100);
    }

    function stopVisualizer() {
        clearInterval(visualizerInterval);
        visualizerBars.forEach(bar => {
            bar.style.height = '10%';
        });
    }

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);

    // Initial load
    loadTrack(currentindex);
}
