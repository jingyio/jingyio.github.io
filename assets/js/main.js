// Theme switcher - 全局定义函数以便HTML直接调用
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
    
    // 更新主题切换按钮的图标
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// 专门处理部分的展开/折叠
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const content = section.querySelector('.section-content');
    const arrow = section.querySelector('.section-arrow');
    
    if (!content || !arrow) return;
    
    content.classList.toggle('expanded');
    
    // 更新箭头方向
    if (content.classList.contains('expanded')) {
        arrow.textContent = '▲';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        arrow.textContent = '▼';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    const isDark = localStorage.getItem('darkTheme') === 'true';
    if (isDark) {
        document.body.classList.add('dark-theme');
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }
    
    // 平滑滚动
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    if (smoothScrollLinks.length > 0) {
        smoothScrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // 初始化所有部分
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        sections.forEach(section => {
            const content = section.querySelector('.section-content');
            if (content) {
                // 默认展开所有部分
                content.classList.add('expanded');
            }
        });
    }
    
    // 为所有列表项添加悬停效果
    const awardItems = document.querySelectorAll('#awards li, #other li');
    if (awardItems.length > 0) {
        awardItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            item.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
    }
    
    // 项目卡片和科研经历卡片悬停效果
    const hoverItems = document.querySelectorAll('.project-item, .experience-item');
    if (hoverItems.length > 0) {
        hoverItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            item.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
    }
    
    // 技能类别交互
    const skillCategories = document.querySelectorAll('.skill-category');
    if (skillCategories.length > 0) {
        skillCategories.forEach(skill => {
            skill.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
    
    // 初始化项目卡片
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const value = bar.getAttribute('data-value');
        if (value) {
            bar.style.width = value + '%';
        }
    });
});

// Add animation to sections when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
});

// Add click effect to skill categories
document.querySelectorAll('.skill-category').forEach(skill => {
    skill.addEventListener('click', () => {
        skill.classList.toggle('expanded');
    });
});

// Add progress bar animation
function animateProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const value = bar.getAttribute('data-value');
        bar.style.width = value + '%';
    });
} 