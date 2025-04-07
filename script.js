// Data Visualization Tool JavaScript

// Global variables
let parsedData = null;
let chartInstance = null;
let dataColumns = [];
let currentChartType = 'bar';
let currentColorScheme = 'default';

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Input option tabs
    const inputOptions = document.querySelectorAll('.input-option');
    const inputContainers = document.querySelectorAll('.input-container');
    
    // Data processing
    const dataInput = document.getElementById('data-input');
    const dataFormat = document.getElementById('data-format');
    const fileInput = document.getElementById('file-input');
    const sampleOptions = document.querySelectorAll('.sample-option');
    const processDataBtn = document.getElementById('process-data-btn');
    
    // Visualization controls
    const chartType = document.getElementById('chart-type');
    const xAxis = document.getElementById('x-axis');
    const yAxis = document.getElementById('y-axis');
    const category = document.getElementById('category');
    const size = document.getElementById('size');
    const colorScheme = document.getElementById('color-scheme');
    const generateVizBtn = document.getElementById('generate-viz-btn');
    
    // Visualization customization
    const chartTitle = document.getElementById('chart-title');
    const xAxisLabel = document.getElementById('x-axis-label');
    const yAxisLabel = document.getElementById('y-axis-label');
    const legendPosition = document.getElementById('legend-position');
    const animationDuration = document.getElementById('animation-duration');
    const showGrid = document.getElementById('show-grid');
    const showDataLabels = document.getElementById('show-data-labels');
    const updateVizBtn = document.getElementById('update-viz-btn');
    
    // Export options
    const exportPng = document.getElementById('export-png');
    const exportJpg = document.getElementById('export-jpg');
    const exportSvg = document.getElementById('export-svg');
    const exportData = document.getElementById('export-data');
    const shareBtn = document.getElementById('share-btn');
    
    // Modal
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const aboutLink = document.getElementById('about-link');
    const helpLink = document.getElementById('help-link');
    
    // Initialize event listeners
    initEventListeners();
    
    // Sample data
    const sampleDatasets = {
        population: {
            format: 'csv',
            data: `Country,Population,Growth Rate,Continent
United States,331002651,0.59,North America
China,1439323776,0.39,Asia
India,1380004385,0.99,Asia
Indonesia,273523615,1.07,Asia
Pakistan,220892340,2.00,Asia
Brazil,212559417,0.72,South America
Nigeria,206139589,2.58,Africa
Bangladesh,164689383,1.01,Asia
Russia,145934462,0.04,Europe
Mexico,128932753,1.06,North America
Japan,126476461,-0.30,Asia
Ethiopia,114963588,2.57,Africa
Philippines,109581078,1.35,Asia
Egypt,102334404,1.94,Africa
Vietnam,97338579,0.91,Asia
Germany,83783942,0.32,Europe
United Kingdom,67886011,0.53,Europe
France,65273511,0.22,Europe
Italy,60461826,-0.15,Europe
South Africa,59308690,1.28,Africa`
        },
        sales: {
            format: 'csv',
            data: `Month,Product,Category,Sales,Profit
January,Laptop,Electronics,45000,15000
January,Smartphone,Electronics,65000,25000
January,Headphones,Electronics,12000,5000
January,T-shirt,Clothing,8000,3000
January,Jeans,Clothing,12000,4500
February,Laptop,Electronics,48000,16000
February,Smartphone,Electronics,70000,28000
February,Headphones,Electronics,15000,6000
February,T-shirt,Clothing,7500,2800
February,Jeans,Clothing,11000,4000
March,Laptop,Electronics,52000,18000
March,Smartphone,Electronics,75000,30000
March,Headphones,Electronics,18000,7500
March,T-shirt,Clothing,9000,3500
March,Jeans,Clothing,13500,5000
April,Laptop,Electronics,55000,19000
April,Smartphone,Electronics,80000,32000
April,Headphones,Electronics,20000,8500
April,T-shirt,Clothing,10500,4000
April,Jeans,Clothing,15000,5800
May,Laptop,Electronics,58000,20000
May,Smartphone,Electronics,85000,34000
May,Headphones,Electronics,22000,9500
May,T-shirt,Clothing,12000,4800
May,Jeans,Clothing,16500,6500
June,Laptop,Electronics,60000,21000
June,Smartphone,Electronics,90000,36000
June,Headphones,Electronics,25000,11000
June,T-shirt,Clothing,15000,6000
June,Jeans,Clothing,18000,7200`
        },
        weather: {
            format: 'csv',
            data: `Date,City,Temperature,Humidity,Precipitation,WindSpeed
2025-01-01,New York,32,65,0.5,10
2025-01-01,Los Angeles,68,45,0,5
2025-01-01,Chicago,28,70,0.8,15
2025-01-01,Miami,75,80,0.2,8
2025-01-01,Seattle,45,90,1.2,12
2025-01-02,New York,30,68,0.7,12
2025-01-02,Los Angeles,70,40,0,4
2025-01-02,Chicago,25,75,1.0,18
2025-01-02,Miami,78,75,0,6
2025-01-02,Seattle,43,95,1.5,14
2025-01-03,New York,28,70,1.0,15
2025-01-03,Los Angeles,72,38,0,3
2025-01-03,Chicago,22,80,1.2,20
2025-01-03,Miami,80,70,0,5
2025-01-03,Seattle,40,98,2.0,16
2025-01-04,New York,35,60,0.2,8
2025-01-04,Los Angeles,75,35,0,2
2025-01-04,Chicago,30,65,0.5,12
2025-01-04,Miami,82,65,0,4
2025-01-04,Seattle,42,92,1.8,15
2025-01-05,New York,38,55,0,5
2025-01-05,Los Angeles,78,30,0,1
2025-01-05,Chicago,32,60,0.3,10
2025-01-05,Miami,85,60,0,3
2025-01-05,Seattle,45,85,1.0,10
2025-01-06,New York,40,50,0,3
2025-01-06,Los Angeles,80,25,0,1
2025-01-06,Chicago,35,55,0,8
2025-01-06,Miami,88,55,0,2
2025-01-06,Seattle,48,80,0.5,8
2025-01-07,New York,42,45,0,2
2025-01-07,Los Angeles,82,20,0,1
2025-01-07,Chicago,38,50,0,5
2025-01-07,Miami,90,50,0,1
2025-01-07,Seattle,50,75,0.2,5`
        }
    };
    
    // Initialize event listeners
    function initEventListeners() {
        // Input option tabs
        inputOptions.forEach(option => {
            option.addEventListener('click', function() {
                const optionType = this.getAttribute('data-option');
                
                // Update active tab
                inputOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding container
                inputContainers.forEach(container => container.classList.add('hidden'));
                document.getElementById(`${optionType}-container`).classList.remove('hidden');
            });
        });
        
        // File input change
        fileInput.addEventListener('change', handleFileUpload);
        
        // Sample data options
        sampleOptions.forEach(option => {
            option.addEventListener('click', function() {
                const sampleType = this.getAttribute('data-sample');
                const sampleData = sampleDatasets[sampleType];
                
                if (sampleData) {
                    // Switch to paste tab and update content
                    inputOptions.forEach(opt => opt.classList.remove('active'));
                    document.querySelector('[data-option="paste"]').classList.add('active');
                    
                    inputContainers.forEach(container => container.classList.add('hidden'));
                    document.getElementById('paste-container').classList.remove('hidden');
                    
                    dataInput.value = sampleData.data;
                    dataFormat.value = sampleData.format;
                }
            });
        });
        
        // Process data button
        processDataBtn.addEventListener('click', processData);
        
        // Chart type change
        chartType.addEventListener('change', function() {
            currentChartType = this.value;
            updateChartControls();
        });
        
        // Color scheme change
        colorScheme.addEventListener('change', function() {
            currentColorScheme = this.value;
        });
        
        // Generate visualization button
        generateVizBtn.addEventListener('click', generateVisualization);
        
        // Update visualization button
        updateVizBtn.addEventListener('click', updateVisualization);
        
        // Export buttons
        exportPng.addEventListener('click', () => exportChart('png'));
        exportJpg.addEventListener('click', () => exportChart('jpg'));
        exportSvg.addEventListener('click', () => exportChart('svg'));
        exportData.addEventListener('click', exportDataToFile);
        shareBtn.addEventListener('click', shareVisualization);
        
        // Modal events
        closeModal.addEventListener('click', () => modal.classList.add('hidden'));
        aboutLink.addEventListener('click', showAboutModal);
        helpLink.addEventListener('click', showHelpModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
    
    // Handle file upload
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const fileName = file.name.toLowerCase();
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result;
            
            // Switch to paste tab and update content
            inputOptions.forEach(opt => opt.classList.remove('active'));
            document.querySelector('[data-option="paste"]').classList.add('active');
            
            inputContainers.forEach(container => container.classList.add('hidden'));
            document.getElementById('paste-container').classList.remove('hidden');
            
            dataInput.value = content;
            
            // Auto-detect format
            if (fileName.endsWith('.csv')) {
                dataFormat.value = 'csv';
            } else if (fileName.endsWith('.json')) {
                dataFormat.value = 'json';
            } else if (fileName.endsWith('.tsv')) {
                dataFormat.value = 'tsv';
            }
        };
        
        reader.readAsText(file);
    }
    
    // Process data
    function processData() {
        const data = dataInput.value.trim();
        const format = dataFormat.value;
        
        if (!data) {
            showError('Please enter or upload data');
            return;
        }
        
        try {
            // Show loading indicator
            document.getElementById('loading-indicator').classList.remove('hidden');
            
            // Parse data based on format
            switch (format) {
                case 'csv':
                    parsedData = Papa.parse(data, {
                        header: true,
                        skipEmptyLines: true,
                        dynamicTyping: true
                    }).data;
                    break;
                case 'json':
                    parsedData = JSON.parse(data);
                    // Handle array of objects or object with arrays
                    if (!Array.isArray(parsedData)) {
                        // Convert object to array of objects if needed
                        const firstKey = Object.keys(parsedData)[0];
                        if (Array.isArray(parsedData[firstKey])) {
                            const keys = Object.keys(parsedData);
                            const firstArray = parsedData[firstKey];
                            const newArray = [];
                            
                            for (let i = 0; i < firstArray.length; i++) {
                                const obj = {};
                                keys.forEach(key => {
                                    obj[key] = parsedData[key][i];
                                });
                                newArray.push(obj);
                            }
                            parsedData = newArray;
                        } else {
                            parsedData = [parsedData];
                        }
                    }
                    break;
                case 'tsv':
                    parsedData = Papa.parse(data, {
                        header: true,
                        skipEmptyLines: true,
                        dynamicTyping: true,
                        delimiter: '\t'
                    }).data;
                    break;
                default:
                    throw new Error('Unsupported format');
            }
            
            // Extract column names
            if (parsedData && parsedData.length > 0) {
                dataColumns = Object.keys(parsedData[0]);
                
                // Update axis selectors
                updateAxisSelectors();
                
                // Enable visualization controls
                document.getElementById('generate-viz-btn').disabled = false;
                
                // Show success message
                showSuccess(`Data processed successfully. ${parsedData.length} rows found.`);
            } else {
                throw new Error('No data found or invalid format');
            }
        } catch (error) {
            showError(`Error processing data: ${error.message}`);
            console.error(error);
        } finally {
            // Hide loading indicator
            document.getElementById('loading-indicator').classList.add('hidden');
        }
    }
    
    // Update axis selectors with column names
    function updateAxisSelectors() {
        // Clear existing options
        xAxis.innerHTML = '<option value="">Select column</option>';
        yAxis.innerHTML = '<option value="">Select column</option>';
        category.innerHTML = '<option value="">Select column (optional)</option>';
        size.innerHTML = '<option value="">Select column (optional)</option>';
        
        // Add options for each column
        dataColumns.forEach(column => {
            xAxis.innerHTML += `<option value="${column}">${column}</option>`;
            yAxis.innerHTML += `<option value="${column}">${column}</option>`;
            category.innerHTML += `<option value="${column}">${column}</option>`;
            size.innerHTML += `<option value="${column}">${column}</option>`;
        });
        
        // Enable selectors
        xAxis.disabled = false;
        yAxis.disabled = false;
        category.disabled = false;
        size.disabled = false;
        
        // Update chart controls based on chart type
        updateChartControls();
    }
    
    // Update chart controls based on chart type
    function updateChartControls() {
        // Reset visibility
        document.getElementById('category-group').style.display = 'block';
        document.getElementById('size-group').style.display = 'none';
        
        // Adjust controls based on chart type
        switch (currentChartType) {
            case 'pie':
            case 'doughnut':
                document.getElementById('y-axis').disabled = true;
                document.getElementById('category-group').style.display = 'none';
                break;
            case 'bubble':
                document.getElementById('size-group').style.display = 'block';
                break;
            case 'scatter':
                document.getElementById('category-group').style.display = 'block';
                break;
            default:
                document.getElementById('y-axis').disabled = false;
                document.getElementById('category-group').style.display = 'block';
        }
    }
    
    // Generate visualization
    function generateVisualization() {
        const selectedXAxis = xAxis.value;
        const selectedYAxis = yAxis.value;
        const selectedCategory = category.value;
        const selectedSize = size.value;
        
        // Validate selections
        if (!selectedXAxis) {
            showError('Please select X-Axis column');
            return;
        }
        
        if (!selectedYAxis && currentChartType !== 'pie' && currentChartType !== 'doughnut') {
            showError('Please select Y-Axis column');
            return;
        }
        
        try {
            // Show loading indicator
            document.getElementById('loading-indicator').classList.remove('hidden');
            
            // Prepare chart data
            const chartData = prepareChartData(selectedXAxis, selectedYAxis, selectedCategory, selectedSize);
            
            // Create or update chart
            createChart(chartData);
            
            // Show customization and export options
            document.querySelector('.viz-options').classList.remove('hidden');
            document.querySelector('.export-options').classList.remove('hidden');
            
            // Set default labels
            chartTitle.value = `${selectedYAxis || selectedXAxis} by ${selectedXAxis}`;
            xAxisLabel.value = selectedXAxis;
            yAxisLabel.value = selectedYAxis || '';
            
            // Show success message
            showSuccess('Visualization generated successfully');
        } catch (error) {
            showError(`Error generating visualization: ${error.message}`);
            console.error(error);
        } finally {
            // Hide loading indicator
            document.getElementById('loading-indicator').classList.add('hidden');
        }
    }
    
    // Prepare chart data based on selections
    function prepareChartData(xAxisColumn, yAxisColumn, categoryColumn, sizeColumn) {
        // Get unique categories if category is selected
        let categories = [];
        if (categoryColumn) {
            categories = [...new Set(parsedData.map(item => item[categoryColumn]))];
        }
        
        // Get unique x-axis values
        const xValues = [...new Set(parsedData.map(item => item[xAxisColumn]))];
        
        // Prepare datasets
        let datasets = [];
        
        if (currentChartType === 'pie' || currentChartType === 'doughnut') {
            // For pie/doughnut charts, we need a single dataset with all values
            const data = xValues.map(xValue => {
                const filteredData = parsedData.filter(item => item[xAxisColumn] === xValue);
                return filteredData.length;
            });
            
            datasets = [{
                data: data,
                backgroundColor: getColors(xValues.length),
                label: xAxisColumn
            }];
            
            return {
                labels: xValues,
                datasets: datasets
            };
        } else if (categoryColumn) {
            // Create a dataset for each category
            datasets = categories.map((category, index) => {
                const filteredData = parsedData.filter(item => item[categoryColumn] === category);
                
                // Map data for each x value
                const data = xValues.map(xValue => {
                    const matchingItems = filteredData.filter(item => item[xAxisColumn] === xValue);
                    
                    if (matchingItems.length === 0) return null;
                    
                    if (currentChartType === 'bubble' && sizeColumn) {
                        // For bubble charts, return an object with x, y, and r properties
                        return {
                            x: xValue,
                            y: matchingItems.reduce((sum, item) => sum + (item[yAxisColumn] || 0), 0) / matchingItems.length,
                            r: matchingItems.reduce((sum, item) => sum + (item[sizeColumn] || 0), 0) / matchingItems.length * 5
                        };
                    } else if (currentChartType === 'scatter') {
                        // For scatter plots, return an object with x and y properties
                        return {
                            x: xValue,
                            y: matchingItems.reduce((sum, item) => sum + (item[yAxisColumn] || 0), 0) / matchingItems.length
                        };
                    } else {
                        // For other charts, return the average y value
                        return matchingItems.reduce((sum, item) => sum + (item[yAxisColumn] || 0), 0) / matchingItems.length;
                    }
                });
                
                return {
                    label: category.toString(),
                    data: data,
                    backgroundColor: getColor(index, categories.length, 0.6),
                    borderColor: getColor(index, categories.length, 1),
                    borderWidth: 1
                };
            });
        } else {
            // Create a single dataset
            let data;
            
            if (currentChartType === 'bubble' && sizeColumn) {
                // For bubble charts, create objects with x, y, and r properties
                data = parsedData.map(item => ({
                    x: item[xAxisColumn],
                    y: item[yAxisColumn],
                    r: (item[sizeColumn] || 1) * 5
                }));
            } else if (currentChartType === 'scatter') {
                // For scatter plots, create objects with x and y properties
                data = parsedData.map(item => ({
                    x: item[xAxisColumn],
                    y: item[yAxisColumn]
                }));
            } else {
                // For other charts, aggregate data by x-axis values
                data = xValues.map(xValue => {
                    const matchingItems = parsedData.filter(item => item[xAxisColumn] === xValue);
                    return matchingItems.reduce((sum, item) => sum + (item[yAxisColumn] || 0), 0) / matchingItems.length;
                });
            }
            
            datasets = [{
                label: yAxisColumn || xAxisColumn,
                data: data,
                backgroundColor: getColor(0, 1, 0.6),
                borderColor: getColor(0, 1, 1),
                borderWidth: 1
            }];
        }
        
        return {
            labels: xValues,
            datasets: datasets
        };
    }
    
    // Create or update chart
    function createChart(chartData) {
        // Get canvas element
        const canvas = document.getElementById('chart-canvas');
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        // Hide placeholder and show chart container
        document.getElementById('viz-placeholder').classList.add('hidden');
        document.getElementById('chart-container').classList.remove('hidden');
        
        // Create chart options
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: xAxis.value
                    },
                    grid: {
                        display: true
                    }
                },
                y: {
                    display: currentChartType !== 'pie' && currentChartType !== 'doughnut',
                    title: {
                        display: true,
                        text: yAxis.value
                    },
                    grid: {
                        display: true
                    }
                }
            },
            animation: {
                duration: 1000
            }
        };
        
        // Create chart
        chartInstance = new Chart(ctx, {
            type: currentChartType,
            data: chartData,
            options: options
        });
    }
    
    // Update visualization with customization options
    function updateVisualization() {
        if (!chartInstance) return;
        
        // Update chart title
        chartInstance.options.plugins.title = {
            display: !!chartTitle.value,
            text: chartTitle.value,
            font: {
                size: 18
            }
        };
        
        // Update axis labels
        chartInstance.options.scales.x.title.text = xAxisLabel.value;
        if (chartInstance.options.scales.y) {
            chartInstance.options.scales.y.title.text = yAxisLabel.value;
        }
        
        // Update legend position
        chartInstance.options.plugins.legend.position = legendPosition.value;
        chartInstance.options.plugins.legend.display = legendPosition.value !== 'none';
        
        // Update animation duration
        chartInstance.options.animation.duration = parseInt(animationDuration.value);
        
        // Update grid lines
        if (chartInstance.options.scales.x) {
            chartInstance.options.scales.x.grid.display = showGrid.checked;
        }
        if (chartInstance.options.scales.y) {
            chartInstance.options.scales.y.grid.display = showGrid.checked;
        }
        
        // Update data labels
        chartInstance.options.plugins.datalabels = {
            display: showDataLabels.checked,
            align: 'center',
            anchor: 'center',
            font: {
                weight: 'bold'
            }
        };
        
        // Update chart
        chartInstance.update();
        
        // Show success message
        showSuccess('Visualization updated successfully');
    }
    
    // Export chart as image
    function exportChart(format) {
        if (!chartInstance) return;
        
        // Get canvas element
        const canvas = document.getElementById('chart-canvas');
        
        // Create a temporary link element
        const link = document.createElement('a');
        
        // Set link attributes based on format
        switch (format) {
            case 'png':
                link.href = canvas.toDataURL('image/png');
                link.download = 'visualization.png';
                break;
            case 'jpg':
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'visualization.jpg';
                break;
            case 'svg':
                // For SVG, we need to create a new SVG element
                const svgData = new XMLSerializer().serializeToString(document.querySelector('#chart-container svg'));
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                link.href = URL.createObjectURL(svgBlob);
                link.download = 'visualization.svg';
                break;
            default:
                return;
        }
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showSuccess(`Visualization exported as ${format.toUpperCase()}`);
    }
    
    // Export data to file
    function exportDataToFile() {
        if (!parsedData) return;
        
        // Create CSV content
        const csv = Papa.unparse(parsedData);
        
        // Create a blob and download link
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.csv';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showSuccess('Data exported as CSV');
    }
    
    // Share visualization
    function shareVisualization() {
        // In a real application, this would generate a shareable link or embed code
        // For this demo, we'll show a modal with instructions
        modalBody.innerHTML = `
            <h2>Share Visualization</h2>
            <p>In a production environment, this would generate a shareable link or embed code for your visualization.</p>
            <p>For now, you can export the visualization as an image and share it manually.</p>
        `;
        modal.classList.remove('hidden');
    }
    
    // Show about modal
    function showAboutModal() {
        modalBody.innerHTML = `
            <h2>About Data Visualization Tool</h2>
            <p>This is a versatile data visualization tool that allows you to create interactive charts and graphs from your data.</p>
            <p>Features:</p>
            <ul>
                <li>Support for various data formats (CSV, JSON, TSV)</li>
                <li>Multiple chart types (bar, line, pie, scatter, etc.)</li>
                <li>Customization options for colors, labels, and more</li>
                <li>Export capabilities for sharing and presentation</li>
                <li>Responsive design for all devices</li>
            </ul>
            <p>Created with HTML, CSS, and JavaScript using Chart.js and D3.js libraries.</p>
        `;
        modal.classList.remove('hidden');
    }
    
    // Show help modal
    function showHelpModal() {
        modalBody.innerHTML = `
            <h2>How to Use the Data Visualization Tool</h2>
            <ol>
                <li><strong>Input Your Data:</strong> Paste data, upload a file, or use sample data</li>
                <li><strong>Process Data:</strong> Click the "Process Data" button to parse your data</li>
                <li><strong>Configure Visualization:</strong> Select chart type and axis mappings</li>
                <li><strong>Generate Visualization:</strong> Click "Generate Visualization" to create your chart</li>
                <li><strong>Customize (Optional):</strong> Adjust titles, labels, and visual settings</li>
                <li><strong>Export or Share:</strong> Save your visualization in various formats</li>
            </ol>
            <p><strong>Supported Data Formats:</strong></p>
            <ul>
                <li>CSV (Comma-Separated Values)</li>
                <li>JSON (JavaScript Object Notation)</li>
                <li>TSV (Tab-Separated Values)</li>
            </ul>
            <p><strong>Tip:</strong> For best results, ensure your data is clean and properly formatted before uploading.</p>
        `;
        modal.classList.remove('hidden');
    }
    
    // Show success message (could be implemented with a toast notification)
    function showSuccess(message) {
        console.log('Success:', message);
        // In a real application, this would show a toast notification
    }
    
    // Show error message (could be implemented with a toast notification)
    function showError(message) {
        console.error('Error:', message);
        // In a real application, this would show a toast notification
    }
    
    // Get color based on index and total count
    function getColor(index, count, alpha = 1) {
        // Color schemes
        const colorSchemes = {
            default: [
                `rgba(54, 162, 235, ${alpha})`,
                `rgba(255, 99, 132, ${alpha})`,
                `rgba(255, 206, 86, ${alpha})`,
                `rgba(75, 192, 192, ${alpha})`,
                `rgba(153, 102, 255, ${alpha})`,
                `rgba(255, 159, 64, ${alpha})`,
                `rgba(199, 199, 199, ${alpha})`,
                `rgba(83, 102, 255, ${alpha})`,
                `rgba(40, 159, 64, ${alpha})`,
                `rgba(210, 199, 199, ${alpha})`
            ],
            pastel: [
                `rgba(187, 222, 251, ${alpha})`,
                `rgba(255, 236, 179, ${alpha})`,
                `rgba(209, 196, 233, ${alpha})`,
                `rgba(200, 230, 201, ${alpha})`,
                `rgba(255, 205, 210, ${alpha})`,
                `rgba(225, 245, 254, ${alpha})`,
                `rgba(255, 224, 178, ${alpha})`,
                `rgba(225, 190, 231, ${alpha})`,
                `rgba(220, 237, 200, ${alpha})`,
                `rgba(248, 187, 208, ${alpha})`
            ],
            vibrant: [
                `rgba(0, 176, 255, ${alpha})`,
                `rgba(255, 64, 129, ${alpha})`,
                `rgba(255, 167, 38, ${alpha})`,
                `rgba(29, 233, 182, ${alpha})`,
                `rgba(156, 39, 176, ${alpha})`,
                `rgba(255, 87, 34, ${alpha})`,
                `rgba(0, 200, 83, ${alpha})`,
                `rgba(103, 58, 183, ${alpha})`,
                `rgba(255, 193, 7, ${alpha})`,
                `rgba(3, 169, 244, ${alpha})`
            ],
            monochrome: [
                `rgba(33, 33, 33, ${alpha})`,
                `rgba(66, 66, 66, ${alpha})`,
                `rgba(97, 97, 97, ${alpha})`,
                `rgba(117, 117, 117, ${alpha})`,
                `rgba(158, 158, 158, ${alpha})`,
                `rgba(189, 189, 189, ${alpha})`,
                `rgba(224, 224, 224, ${alpha})`,
                `rgba(238, 238, 238, ${alpha})`,
                `rgba(245, 245, 245, ${alpha})`,
                `rgba(250, 250, 250, ${alpha})`
            ],
            diverging: [
                `rgba(183, 28, 28, ${alpha})`,
                `rgba(211, 47, 47, ${alpha})`,
                `rgba(244, 67, 54, ${alpha})`,
                `rgba(255, 152, 0, ${alpha})`,
                `rgba(255, 193, 7, ${alpha})`,
                `rgba(255, 235, 59, ${alpha})`,
                `rgba(205, 220, 57, ${alpha})`,
                `rgba(139, 195, 74, ${alpha})`,
                `rgba(76, 175, 80, ${alpha})`,
                `rgba(0, 150, 136, ${alpha})`
            ]
        };
        
        // Get colors for current scheme
        const colors = colorSchemes[currentColorScheme] || colorSchemes.default;
        
        // Return color based on index
        return colors[index % colors.length];
    }
    
    // Get array of colors
    function getColors(count) {
        return Array.from({ length: count }, (_, i) => getColor(i, count, 0.6));
    }
});
