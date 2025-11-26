// Sidebar Submenu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all nav items with submenus
    const submenuItems = document.querySelectorAll('.has-submenu .nav-item');
    
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const wrapper = this.closest('.nav-item-wrapper');
            const isOpen = wrapper.classList.contains('open');
            
            // Close all other submenus
            document.querySelectorAll('.nav-item-wrapper.open').forEach(openWrapper => {
                if (openWrapper !== wrapper) {
                    openWrapper.classList.remove('open');
                }
            });
            
            // Toggle current submenu
            wrapper.classList.toggle('open');
        });
    });
    
    // Close submenus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item-wrapper')) {
            document.querySelectorAll('.nav-item-wrapper.open').forEach(wrapper => {
                wrapper.classList.remove('open');
            });
        }
    });
    
    // Add active state to submenu items
    const submenuItemElements = document.querySelectorAll('.submenu-item');
    submenuItemElements.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove active from all submenu items
            submenuItemElements.forEach(el => el.classList.remove('active'));
            
            // Add active to clicked item
            this.classList.add('active');
        });
    });
});
