// Initialize map
// Cyprus center coordinates: approximately 35.0°N, 33.0°E
const map = L.map('map').setView([35.0, 33.0], 9);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Add markers for major cities of Cyprus
const cities = [
    {
        name: 'Nicosia',
        coords: [35.1856, 33.3823],
        description: 'Capital of Cyprus'
    },
    {
        name: 'Limassol',
        coords: [34.7071, 33.0226],
        description: 'Second largest city'
    },
    {
        name: 'Larnaca',
        coords: [34.9167, 33.6333],
        description: 'City on the south coast'
    },
    {
        name: 'Paphos',
        coords: [34.7766, 32.4245],
        description: 'City on the west coast'
    },
    {
        name: 'Ayia Napa',
        coords: [34.9861, 34.0014],
        description: 'Resort town'
    },
    {
        name: 'Protaras',
        coords: [35.0125, 34.0583],
        description: 'Resort area'
    }
];

// Create custom icons
const cityIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Add markers to the map
cities.forEach(city => {
    L.marker(city.coords, { icon: cityIcon })
        .addTo(map)
        .bindPopup(`<b>${city.name}</b><br>${city.description}`)
        .openPopup();
});

// Add Limassol area polygon (real city boundaries)
const limassolArea = L.polygon([
    [34.78, 32.85],  // West, inland
    [34.80, 32.90],  // Northwest
    [34.82, 32.95],  // North
    [34.82, 33.05],  // Northeast
    [34.80, 33.10],  // East, inland
    [34.75, 33.12],  // Southeast, inland
    [34.70, 33.08],  // South, inland
    [34.68, 33.00],  // Southwest, inland
    [34.68, 32.95],  // West, near coast
    [34.70, 32.90],  // West, coastal
    [34.72, 32.88],  // West, coastal
    [34.75, 32.87]   // West, coastal
], {
    color: '#3388ff',
    fillColor: '#3388ff',
    fillOpacity: 0.3,
    weight: 2
}).addTo(map);

limassolArea.bindPopup('<b>Limassol</b><br>City boundaries');

// Surface type layers for fire spread analysis
// Forests - areas with dense vegetation (high fire risk)
const forestLayers = L.layerGroup([
    // Troodos Mountains area (main forest region)
    L.polygon([
        [34.95, 32.70], [35.05, 32.75], [35.10, 32.85], [35.08, 32.95],
        [35.00, 33.05], [34.90, 33.00], [34.85, 32.90], [34.88, 32.80]
    ], {
        color: '#dc3545',
        fillColor: '#dc3545',
        fillOpacity: 0.5,
        weight: 1
    }).bindPopup('<b>Forest Area</b><br>High fire risk'),
    
    // Paphos forest area
    L.polygon([
        [34.85, 32.40], [34.90, 32.50], [34.88, 32.60], [34.80, 32.55], [34.75, 32.45]
    ], {
        color: '#dc3545',
        fillColor: '#dc3545',
        fillOpacity: 0.5,
        weight: 1
    }).bindPopup('<b>Forest Area</b><br>High fire risk'),
    
    // Northern forest areas
    L.polygon([
        [35.15, 33.20], [35.25, 33.30], [35.20, 33.40], [35.10, 33.35], [35.08, 33.25]
    ], {
        color: '#dc3545',
        fillColor: '#dc3545',
        fillOpacity: 0.5,
        weight: 1
    }).bindPopup('<b>Forest Area</b><br>High fire risk')
]).addTo(map);

// Grass/Scrubland - areas with grass and low vegetation (medium fire risk)
const grassLayers = L.layerGroup([
    // Central plains
    L.polygon([
        [34.90, 33.00], [35.00, 33.10], [35.05, 33.20], [35.00, 33.30],
        [34.90, 33.25], [34.85, 33.15], [34.88, 33.05]
    ], {
        color: '#8fbc8f',
        fillColor: '#8fbc8f',
        fillOpacity: 0.4,
        weight: 1
    }).bindPopup('<b>Grass/Scrubland</b><br>Medium fire risk'),
    
    // Areas around Limassol
    L.polygon([
        [34.65, 32.90], [34.75, 32.95], [34.78, 33.05], [34.72, 33.10],
        [34.65, 33.05], [34.60, 32.98]
    ], {
        color: '#8fbc8f',
        fillColor: '#8fbc8f',
        fillOpacity: 0.4,
        weight: 1
    }).bindPopup('<b>Grass/Scrubland</b><br>Medium fire risk'),
    
    // Eastern areas
    L.polygon([
        [34.95, 33.50], [35.05, 33.60], [35.00, 33.70], [34.90, 33.65], [34.88, 33.55]
    ], {
        color: '#8fbc8f',
        fillColor: '#8fbc8f',
        fillOpacity: 0.4,
        weight: 1
    }).bindPopup('<b>Grass/Scrubland</b><br>Medium fire risk')
]).addTo(map);

// Roads - fire barriers (low fire risk, can act as firebreaks)
const roadLayers = L.layerGroup([
    // Main highway A1 (Nicosia-Limassol)
    L.polyline([
        [35.1856, 33.3823], [35.10, 33.30], [35.00, 33.20], [34.90, 33.10], [34.80, 33.05], [34.7071, 33.0226]
    ], {
        color: '#666',
        weight: 4,
        opacity: 0.8
    }).bindPopup('<b>Main Road</b><br>Fire barrier'),
    
    // Highway A6 (Limassol-Paphos)
    L.polyline([
        [34.7071, 33.0226], [34.75, 32.90], [34.78, 32.70], [34.7766, 32.4245]
    ], {
        color: '#666',
        weight: 4,
        opacity: 0.8
    }).bindPopup('<b>Main Road</b><br>Fire barrier'),
    
    // Highway A3 (Larnaca-Nicosia)
    L.polyline([
        [34.9167, 33.6333], [34.95, 33.50], [35.05, 33.40], [35.1856, 33.3823]
    ], {
        color: '#666',
        weight: 4,
        opacity: 0.8
    }).bindPopup('<b>Main Road</b><br>Fire barrier'),
    
    // Coastal road
    L.polyline([
        [34.7766, 32.4245], [34.70, 32.60], [34.7071, 33.0226], [34.75, 33.20], [34.9167, 33.6333]
    ], {
        color: '#999',
        weight: 3,
        opacity: 0.7
    }).bindPopup('<b>Coastal Road</b><br>Fire barrier')
]).addTo(map);

// Layer control toggles
document.getElementById('toggleForests').addEventListener('change', function(e) {
    if (e.target.checked) {
        map.addLayer(forestLayers);
    } else {
        map.removeLayer(forestLayers);
    }
});

document.getElementById('toggleGrass').addEventListener('change', function(e) {
    if (e.target.checked) {
        map.addLayer(grassLayers);
    } else {
        map.removeLayer(grassLayers);
    }
});

document.getElementById('toggleRoads').addEventListener('change', function(e) {
    if (e.target.checked) {
        map.addLayer(roadLayers);
    } else {
        map.removeLayer(roadLayers);
    }
});

// Fire spread simulation
// Starting point for fire (near Limassol area, in a forest region)
const fireStartPoint = [34.75, 32.95]; // Starting coordinates
let firePolygon = null;

// Function to calculate fire spread polygon based on time
function calculateFireSpread(hours) {
    // Fire spreads in all directions, but faster in certain directions (wind, terrain)
    // Base radius increases with time (in degrees)
    const baseRadius = hours * 0.015; // Base spread rate
    
    // Fire spreads faster in forest areas (north and east from start)
    const northSpread = baseRadius * 1.3; // Faster spread north (towards forests)
    const southSpread = baseRadius * 0.9;  // Slower spread south (towards coast)
    const eastSpread = baseRadius * 1.2;   // Faster spread east (towards forests)
    const westSpread = baseRadius * 0.8;   // Slower spread west
    
    // Create elliptical polygon representing fire spread
    const points = [];
    const numPoints = 32; // Number of points for smooth circle
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        let radius;
        
        // Calculate radius based on direction
        if (angle >= 0 && angle < Math.PI / 2) {
            // Northeast quadrant
            radius = (northSpread + eastSpread) / 2;
        } else if (angle >= Math.PI / 2 && angle < Math.PI) {
            // Northwest quadrant
            radius = (northSpread + westSpread) / 2;
        } else if (angle >= Math.PI && angle < 3 * Math.PI / 2) {
            // Southwest quadrant
            radius = (southSpread + westSpread) / 2;
        } else {
            // Southeast quadrant
            radius = (southSpread + eastSpread) / 2;
        }
        
        // Add some variation for more realistic spread (deterministic based on angle)
        const variation = 1 + Math.sin(angle * 3) * 0.1; // Deterministic variation
        radius *= variation;
        
        const lat = fireStartPoint[0] + radius * Math.cos(angle);
        const lng = fireStartPoint[1] + radius * Math.sin(angle);
        points.push([lat, lng]);
    }
    
    return points;
}

// Function to update fire polygon based on timeline value
function updateFireSpread(hours) {
    // Remove existing fire polygon if it exists
    if (firePolygon) {
        map.removeLayer(firePolygon);
    }
    
    if (hours > 0) {
        const firePoints = calculateFireSpread(hours);
        
        // Create fire polygon with orange/red gradient
        const intensity = Math.min(hours / 24, 1); // Intensity from 0 to 1
        const opacity = 0.3 + (intensity * 0.4); // Opacity from 0.3 to 0.7
        
        firePolygon = L.polygon(firePoints, {
            color: '#ff4500',
            fillColor: '#ff4500',
            fillOpacity: opacity,
            weight: 2
        }).addTo(map);
        
        firePolygon.bindPopup(`<b>Fire Spread</b><br>Time: ${hours} hours<br>Area affected by fire`);
    }
    
    // Update time display
    document.getElementById('timeDisplay').textContent = hours;
}

// Initialize timeline slider
const timelineSlider = document.getElementById('timelineSlider');
const timeDisplay = document.getElementById('timeDisplay');

// Update fire spread when slider moves
timelineSlider.addEventListener('input', function(e) {
    const hours = parseInt(e.target.value);
    updateFireSpread(hours);
});

// Initialize with 0 hours (no fire)
updateFireSpread(0);

// Map information
console.log('Cyprus map loaded successfully!');
console.log('Surface types: Forests (high risk), Grass/Scrubland (medium risk), Roads (fire barriers)');
console.log('Fire spread simulation: Use timeline slider to see fire propagation');

