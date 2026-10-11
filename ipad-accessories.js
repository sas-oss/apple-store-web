// 导航栏滚动效果
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar'); // 改为使用querySelector选择类
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // 修正为正确的类名
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 初始化购物车数量
    updateCartCount();
});

// 配件筛选功能
document.addEventListener('DOMContentLoaded', function() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const productCards = document.querySelectorAll('.product-card');

    filterChips.forEach(chip => {
        chip.addEventListener('click', function () {
            // 更新筛选标签状态
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // 筛选产品
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// 购物车功能
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartToast = document.getElementById('cart-toast');
    const toastMessage = document.getElementById('toast-message');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            
            // 获取商品图片（从当前产品卡片中）
            const productCard = this.closest('.product-card');
            const image = productCard ? productCard.querySelector('.product-image').src : '';

            // 获取本地存储中的购物车
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // 检查商品是否已在购物车中
            const existingItemIndex = cart.findIndex(item => item.name === productName);

            if (existingItemIndex > -1) {
                // 商品已存在，增加数量
                cart[existingItemIndex].quantity++;
            } else {
                // 新增商品
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: image,  // 确保包含图片属性
                    color: '默认',  // 可根据实际情况修改
                    storage: '默认配置'  // 可根据实际情况修改
                });
            }

            // 保存到本地存储
            localStorage.setItem('cart', JSON.stringify(cart));

            // 更新购物车计数
            updateCartCount();

            // 显示提示框
            if (toastMessage) {
                toastMessage.textContent = `${productName} 已添加到购物车`;
            }
            if (cartToast) {
                cartToast.classList.add('active');

                // 3秒后隐藏提示框
                setTimeout(() => {
                    cartToast.classList.remove('active');
                }, 3000);
            }
        });
    });
});

// 更新购物车计数
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    }
}
