const resources = {
    'Developer': {
        'Offshore': 392.00
    },
    'Senior Developer': {
        'Offshore': 548.00
    },
    'Business Analyst': {
        'Offshore': 548.00,
        'Onsite': 800.00
    },
    'Solution Architect': {
        'Offshore': 620.00,
        'Onsite': 1000.00
    },
    'Project Manager': {
        'Offshore': 620.00
    },
    'On site consultant': {
        'Onsite': 1000.00
    }
};

let resourceCounter = 0;

function addResource() {
    const resourcesList = document.getElementById('resourcesList');
    const resourceId = `resource-${resourceCounter}`;
    
    const defaultResource = 'Developer';
    const resourceHTML = `
        <div id="${resourceId}" class="p-4 border border-gray-200 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-medium mb-2">Resource Type</label>
                    <select onchange="updateLocationOptions('${resourceId}')" class="resource-type w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        ${Object.keys(resources).map(resource => 
                            `<option value="${resource}" ${resource === defaultResource ? 'selected' : ''}>${resource}</option>`
                        ).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-medium mb-2">Location</label>
                    <select onchange="updateRate('${resourceId}')" class="resource-location w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        ${Object.keys(resources[defaultResource]).map(location => 
                            `<option value="${location}">${location}</option>`
                        ).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-medium mb-2">Allocation (0.1 - 1.0)</label>
                    <input type="number" class="resource-allocation w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           min="0.1" max="1.0" step="0.1" value="1.0">
                </div>
                <div class="flex items-end">
                    <button onclick="removeResource('${resourceId}')" 
                            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                        <i class="fas fa-trash mr-2"></i>Remove
                    </button>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-gray-700 text-sm font-medium">Daily Rate: </span>
                <span class="daily-rate">SGD ${resources['Developer']['Offshore'].toFixed(2)}</span>
            </div>
        </div>
    `;
    
    resourcesList.insertAdjacentHTML('beforeend', resourceHTML);
    resourceCounter++;
    updateLocationOptions(resourceId);
}

function updateLocationOptions(resourceId) {
    const resourceElement = document.getElementById(resourceId);
    const resourceType = resourceElement.querySelector('.resource-type').value;
    const locationSelect = resourceElement.querySelector('.resource-location');
    const currentLocations = Object.keys(resources[resourceType]);
    
    // Update location options
    locationSelect.innerHTML = `
        <option value="" disabled>Select Location</option>
        ${currentLocations.map(location => `<option value="${location}">${location}</option>`).join('')}
    `;
    
    // Select first available location
    locationSelect.value = currentLocations[0];
    
    updateRate(resourceId);
}

function updateRate(resourceId) {
    const resourceElement = document.getElementById(resourceId);
    const resourceType = resourceElement.querySelector('.resource-type').value;
    const location = resourceElement.querySelector('.resource-location').value;
    const rate = resources[resourceType][location];
    
    resourceElement.querySelector('.daily-rate').textContent = `SGD ${rate.toFixed(2)}`;
}

function removeResource(resourceId) {
    document.getElementById(resourceId).remove();
}

function calculateCost() {
    const duration = parseFloat(document.getElementById('projectDuration').value) || 0;
    let totalCost = 0;
    
    document.querySelectorAll('#resourcesList > div').forEach(resource => {
        const type = resource.querySelector('.resource-type').value;
        const location = resource.querySelector('.resource-location').value;
        const allocation = parseFloat(resource.querySelector('.resource-allocation').value) || 0;
        
        const dailyRate = resources[type][location];
        totalCost += dailyRate * duration * allocation;
    });
    
    document.getElementById('totalCost').textContent = `SGD ${totalCost.toFixed(2)}`;
}

// Add initial resource on page load
document.addEventListener('DOMContentLoaded', () => {
    addResource();
});
