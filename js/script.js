// Hero Animation - Thinking Network
document.addEventListener('DOMContentLoaded', function() {
    const svg = document.querySelector('.thinking-network');
    if (!svg) return;

    const centerNode = { x: 300, y: 300 };
    const nodes = [
        { index: 1, x: 300, y: 120 },
        { index: 2, x: 480, y: 160 },
        { index: 3, x: 520, y: 340 },
        { index: 4, x: 420, y: 480 },
        { index: 5, x: 180, y: 480 },
        { index: 6, x: 80, y: 340 },
        { index: 7, x: 120, y: 160 }
    ];

    // Draw connecting lines
    const networkLines = svg.querySelector('.network-lines');
    
    nodes.forEach(node => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerNode.x);
        line.setAttribute('y1', centerNode.y);
        line.setAttribute('x2', node.x);
        line.setAttribute('y2', node.y);
        line.setAttribute('class', 'network-line');
        networkLines.appendChild(line);
    });

    // Parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 1025) return; // Disable on tablets/mobile

        const hero = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (!heroVisual) return;

        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const offsetX = (x - 0.5) * 15;
        const offsetY = (y - 0.5) * 15;

        svg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    // Pulse animation for center node
    const centerCircle = svg.querySelector('.node-center');
    if (centerCircle) {
        setInterval(() => {
            centerCircle.style.animation = 'none';
            setTimeout(() => {
                centerCircle.style.animation = 'pulse 2s ease-out';
            }, 10);
        }, 3000);
    }

    // Add CSS animation for pulse
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                r: 35px;
                filter: drop-shadow(0 0 20px rgba(65, 105, 255, 0.4));
            }
            50% {
                r: 40px;
                filter: drop-shadow(0 0 40px rgba(65, 105, 255, 0.6));
            }
            100% {
                r: 35px;
                filter: drop-shadow(0 0 20px rgba(65, 105, 255, 0.4));
            }
        }
    `;
    document.head.appendChild(style);

    // Interactive node highlighting
    const orbitNodes = svg.querySelectorAll('.node-orbit');
    orbitNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            nodes.forEach((n, i) => {
                const circle = svg.querySelectorAll('.node-orbit')[i];
                if (i === index) {
                    circle.style.filter = 'drop-shadow(0 0 20px rgba(65, 105, 255, 0.8))';
                    circle.style.r = '28px';
                } else {
                    circle.style.opacity = '0.4';
                }
            });
            
            const line = svg.querySelectorAll('.network-line')[index];
            if (line) line.style.stroke = 'rgba(65, 105, 255, 0.6)';
        });

        node.addEventListener('mouseleave', function() {
            orbitNodes.forEach(n => {
                n.style.opacity = '1';
                n.style.filter = '';
                n.style.r = '24px';
            });
            
            svg.querySelectorAll('.network-line').forEach(line => {
                line.style.stroke = 'rgba(65, 105, 255, 0.2)';
            });
        });
    });
});
