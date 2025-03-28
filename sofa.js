document.addEventListener('DOMContentLoaded', () => {
  const sofaForm = document.getElementById('sofaForm');
  const sofaListDiv = document.getElementById('sofaList');

  // Function to load existing sofas
  function loadSofas() {
    fetch('https://flato.q11.jvmhost.net/api/sofantastic/sofa')
      .then(response => response.json())
      .then(sofas => {
        sofaListDiv.innerHTML = "";
        sofas.forEach(sofa => {
          const div = document.createElement('div');
          div.className = 'sofa-item';
          // Display sofa name and description
          div.textContent = `${sofa.name} - ${sofa.description}`;
          // When clicking on a sofa, redirect to sofa-detail.html?sofaId=...
          div.addEventListener('click', () => {
            window.location.href = `sofa-detail.html?sofaId=${sofa.id}`;
          });
          sofaListDiv.appendChild(div);
        });
      })
      .catch(error => console.error('Error loading sofas:', error));
  }

  // Handle form submission to create a new sofa
  sofaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSofa = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      imageUrl: document.getElementById('imageUrl').value,
      basePrice: parseFloat(document.getElementById('basePrice').value)
    };

    fetch('https://flato.q11.jvmhost.net/api/sofantastic/sofa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSofa)
    })
    .then(response => response.json())
    .then(data => {
      alert('Sofa created!');
      sofaForm.reset();
      loadSofas();
    })
    .catch(error => console.error('Error creating sofa:', error));
  });

  // Initial load of sofas
  loadSofas();
});
