// Quick Links management for Noctua Command Center
import { settings } from './settings.js';

export class QuickLinks {
    constructor() {
        this.links = settings.get('quickLinks');
        this.editMode = false;
    }

    // Get all links
    getAll() {
        return this.links;
    }

    // Add a new link
    add(name, url, icon = '◆') {
        const newLink = { name, url, icon };
        this.links.push(newLink);
        this.save();
        return newLink;
    }

    // Update a link
    update(index, updates) {
        if (index >= 0 && index < this.links.length) {
            this.links[index] = { ...this.links[index], ...updates };
            this.save();
            return true;
        }
        return false;
    }

    // Delete a link
    delete(index) {
        if (index >= 0 && index < this.links.length) {
            this.links.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    // Reorder links
    reorder(fromIndex, toIndex) {
        const [removed] = this.links.splice(fromIndex, 1);
        this.links.splice(toIndex, 0, removed);
        this.save();
    }

    // Save to settings
    save() {
        settings.set('quickLinks', this.links);
    }

    // Render links to DOM
    render(container) {
        container.innerHTML = '';
        this.links.forEach((link, index) => {
            const linkCard = document.createElement('a');
            linkCard.href = link.url;
            linkCard.target = '_blank';
            linkCard.className = 'link-card';
            linkCard.dataset.index = index;

            linkCard.innerHTML = `
                <span class="icon">${link.icon}</span>
                <span>${link.name}</span>
                ${this.editMode ? `
                    <div class="link-actions">
                        <button class="edit-link" data-index="${index}">✎</button>
                        <button class="delete-link" data-index="${index}">✕</button>
                    </div>
                ` : ''}
            `;

            container.appendChild(linkCard);
        });

        if (this.editMode) {
            const addButton = document.createElement('button');
            addButton.className = 'link-card add-link-btn';
            addButton.innerHTML = '<span class="icon">+</span><span>Add Link</span>';
            addButton.onclick = () => this.showAddDialog();
            container.appendChild(addButton);
        }
    }

    // Toggle edit mode
    toggleEditMode() {
        this.editMode = !this.editMode;
        return this.editMode;
    }

    // Show add/edit dialog
    showAddDialog(index = null) {
        const isEdit = index !== null;
        const link = isEdit ? this.links[index] : { name: '', url: '', icon: '◆' };

        const name = prompt('Link Name:', link.name);
        if (!name) return;

        const url = prompt('Link URL:', link.url);
        if (!url) return;

        const icon = prompt('Icon (single character):', link.icon) || '◆';

        if (isEdit) {
            this.update(index, { name, url, icon });
        } else {
            this.add(name, url, icon);
        }

        // Re-render
        const container = document.querySelector('.links-grid');
        if (container) this.render(container);
    }
}

// Initialize Quick Links
export function initQuickLinks() {
    const quickLinks = new QuickLinks();
    const container = document.querySelector('.links-grid');

    if (container) {
        quickLinks.render(container);

        // Add event delegation for edit/delete buttons
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-link')) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(e.target.dataset.index);
                quickLinks.showAddDialog(index);
            } else if (e.target.classList.contains('delete-link')) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(e.target.dataset.index);
                if (confirm('Delete this link?')) {
                    quickLinks.delete(index);
                    quickLinks.render(container);
                }
            }
        });
    }

    return quickLinks;
}
