document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close');
  closeBtn.onclick = () => modal.style.display = 'none';

  // Cases page
  const caseList = document.getElementById('caseList');
  const addCaseBtn = document.querySelector('.add-case');
  if (addCaseBtn) {
    addCaseBtn.addEventListener('click', () => {
      body.innerHTML = `
        <form id="caseForm">
          <input name="title" placeholder="Title" required>
          <select name="status">
            <option>pending</option>
            <option>in_progress</option>
            <option>closed</option>
          </select>
          <button class="btn">Save</button>
        </form>
      `;
      modal.style.display = 'block';
      document.getElementById('caseForm').onsubmit = async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        await fetch('/api/cases', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data),
          credentials: 'include'
        });
        location.reload();
      };
    });
  }

  if (caseList) {
    fetch('/api/cases', {credentials:'include'}).then(r=>r.json()).then(data=>{
      caseList.innerHTML = '';
      data.forEach(c=>{
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${c.title}</td>
          <td>${c.status}</td>
          <td>${c.created_by || ''}</td>
          <td>
            <button class="btn view-case" data-id="${c.id}">View</button>
            ${window.USER_ROLE==='admin' ? `<button class="btn delete-case" data-id="${c.id}">Delete</button>` : ''}
          </td>`;
        caseList.appendChild(row);
      });
    });
  }

  // Delete case
  document.addEventListener('click', async e => {
    if (e.target.classList.contains('delete-case')) {
      await fetch(`/api/cases/${e.target.dataset.id}`, {
        method:'DELETE', credentials:'include'
      });
      location.reload();
    }
    if (e.target.classList.contains('view-case')) {
      const id = e.target.dataset.id;
      const res = await fetch('/api/cases', {credentials:'include'});
      const c = (await res.json()).find(x=>x.id==id);
      body.innerHTML = `
        <h3>${c.title}</h3>
        <p>Status: ${c.status}</p>
        <p>Created by: ${c.created_by}</p>
      `;
      modal.style.display = 'block';
    }
  });

  // Evidence
  const evidenceList = document.getElementById('evidenceList');
  const addEvidenceBtn = document.querySelector('.add-evidence');
  if (addEvidenceBtn) {
    addEvidenceBtn.addEventListener('click', () => {
      body.innerHTML = `
        <form id="evidenceForm">
          <input name="type" placeholder="Type" required>
          <select name="status">
            <option>pending</option>
            <option>in_progress</option>
            <option>closed</option>
          </select>
          <button class="btn">Save</button>
        </form>
      `;
      modal.style.display='block';
      document.getElementById('evidenceForm').onsubmit = async e=>{
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        await fetch('/api/evidence',{
          method:'POST', headers:{'Content-Type':'application/json'},
          credentials:'include', body:JSON.stringify(data)
        });
        location.reload();
      };
    });
  }
  if (evidenceList) {
    fetch('/api/evidence',{credentials:'include'}).then(r=>r.json()).then(data=>{
      evidenceList.innerHTML='';
      data.forEach(e=>{
        const row=document.createElement('tr');
        row.innerHTML = `
          <td>${e.type}</td>
          <td>${e.status}</td>
          <td>${e.uploader}</td>
          <td>${window.USER_ROLE==='admin'?`<button class="btn delete-evidence" data-id="${e.id}">Delete</button>`:''}</td>`;
        evidenceList.appendChild(row);
      });
    });
  }
  document.addEventListener('click', async e=>{
    if(e.target.classList.contains('delete-evidence')){
      await fetch(`/api/evidence/${e.target.dataset.id}`,{method:'DELETE',credentials:'include'});
      location.reload();
    }
  });

  // Users
  const userList=document.getElementById('userList');
  const addUserBtn=document.querySelector('.add-user');
  if(addUserBtn){
    addUserBtn.addEventListener('click',()=>{
      body.innerHTML=`
        <form id="userForm">
          <input name="name" placeholder="Name" required>
          <input name="email" placeholder="Email" required>
          <input name="password" placeholder="Password" type="password" required>
          <select name="role_id">
            <option value="1">Admin</option>
            <option value="2">Prosecutor</option>
            <option value="3">Judge</option>
            <option value="4">Forensic</option>
          </select>
          <button class="btn">Save</button>
        </form>
      `;
      modal.style.display='block';
      document.getElementById('userForm').onsubmit=async e=>{
        e.preventDefault();
        const data=Object.fromEntries(new FormData(e.target));
        await fetch('/api/users',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        location.reload();
      };
    });
  }
  if(userList){
    fetch('/api/users',{credentials:'include'}).then(r=>r.json()).then(data=>{
      userList.innerHTML='';
      data.forEach(u=>{
        const row=document.createElement('tr');
        row.innerHTML=`<td>${u.name}</td><td>${u.email}</td><td>${u.role}</td>
          <td><button class="btn delete-user" data-id="${u.id}">Delete</button></td>`;
        userList.appendChild(row);
      });
    });
  }
  document.addEventListener('click',async e=>{
    if(e.target.classList.contains('delete-user')){
      await fetch(`/api/users/${e.target.dataset.id}`,{method:'DELETE',credentials:'include'});
      location.reload();
    }
  });
});
