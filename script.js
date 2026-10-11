// 导航栏滚动效果
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 移动端菜单切换
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuButton || !mobileMenu) return;
    
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
}

// 购物车功能
function setupCartFunctionality() {
    // 更新购物车计数
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (!cartCount) return;
        
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            cartCount.textContent = totalCount;
        } catch (e) {
            console.error('更新购物车计数失败:', e);
            localStorage.setItem('cart', '[]');
            cartCount.textContent = '0';
        }
    }
    
    // 初始化购物车计数
    updateCartCount();
    
    // 添加到购物车功能
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const cartToast = document.getElementById('cart-toast');
            const summaryColor = document.getElementById('summary-color');
            const selectedStorage = document.querySelector('.storage-option.selected');
            
            if (!summaryColor || !selectedStorage) {
                alert('请选择产品配置');
                return;
            }
            
            try {
                const color = summaryColor.textContent;
                const storage = selectedStorage.getAttribute('data-storage');
                const price = selectedStorage.getAttribute('data-price');
                const productName = document.querySelector('h1')?.textContent || 'Apple产品';
                const productImage = document.querySelector('.product-main-image')?.src || '';
                
                // 创建产品对象
                const product = {
                    id: Date.now(),
                    name: productName,
                    color: color,
                    storage: storage,
                    price: price,
                    image: productImage,
                    quantity: 1
                };
                
                // 保存到本地存储
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // 更新计数和显示提示
                updateCartCount();
                
                if (cartToast) {
                    cartToast.classList.add('show');
                    setTimeout(() => {
                        cartToast.classList.remove('show');
                    }, 3000);
                }
                
            } catch (e) {
                console.error('添加到购物车失败:', e);
                alert('添加到购物车失败，请重试');
            }
        });
    }
}

// 产品颜色选择功能
function setupColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    if (!colorOptions.length) return;
    
    const summaryColor = document.getElementById('summary-color');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // 移除其他选项的选中状态
            colorOptions.forEach(opt => opt.classList.remove('color-option-selected'));
            
            // 添加当前选项的选中状态
            option.classList.add('color-option-selected');
            
            // 更新颜色摘要
            if (summaryColor) {
                summaryColor.textContent = option.getAttribute('data-color');
            }
        });
    });
}

// 产品存储选择功能
function setupStorageSelection() {
    const storageOptions = document.querySelectorAll('.storage-option');
    if (!storageOptions.length) return;
    
    storageOptions.forEach(option => {
        option.addEventListener('click', () => {
            // 移除其他选项的选中状态
            storageOptions.forEach(opt => opt.classList.remove('selected'));
            
            // 添加当前选项的选中状态
            option.classList.add('selected');
        });
    });
}

// 购物车页面功能
function setupCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer || !cartTotal) return;
    
    // 加载购物车项目
    function loadCartItems() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="text-center py-10">您的购物车是空的</p>';
                cartTotal.textContent = '¥0.00';
                return;
            }
            
            let total = 0;
            let cartItemHTML = '';
            
            cart.forEach((item, index) => {
                const price = parseFloat(item.price.replace('¥', ''));
                total += price * (item.quantity || 1);
                
                cartItemHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-md">
                        <div class="flex-1">
                            <h3 class="font-medium">${item.name}</h3>
                            <p class="text-apple-gray">颜色: ${item.color}</p>
                            <p class="text-apple-gray">存储: ${item.storage}</p>
                            <div class="flex items-center mt-2">
                                <button class="quantity-btn minus" data-index="${index}">-</button>
                                <span class="quantity">${item.quantity || 1}</span>
                                <button class="quantity-btn plus" data-index="${index}">+</button>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-medium">${item.price}</p>
                            <button class="remove-item text-apple-red mt-2" data-index="${index}">
                                <i class="fa fa-trash"></i> 删除
                            </button>
                        </div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = cartItemHTML;
            cartTotal.textContent = `¥${total.toFixed(2)}`;
            
            // 添加事件监听器
            setupCartItemEvents();
            
        } catch (e) {
            console.error('加载购物车失败:', e);
            cartItemsContainer.innerHTML = '<p class="text-center py-10">加载购物车时出错</p>';
        }
    }
    
    // 设置购物车项目事件
    function setupCartItemEvents() {
        const removeButtons = document.querySelectorAll('.remove-item');
        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCartItems();
                setupCartFunctionality(); // 更新计数
            });
        });
        
        minusButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    loadCartItems();
                }
            });
        });
        
        plusButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart[index].quantity = (cart[index].quantity || 1) + 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCartItems();
            });
        });
    }
    
    // 初始化加载
    loadCartItems();
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    setupNavbarScroll();
    setupMobileMenu();
    setupCartFunctionality();
    setupColorSelection();
    setupStorageSelection();
    
    // 如果是购物车页面，加载购物车功能
    if (window.location.pathname.includes('cart.html')) {
        setupCartPage();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化规格标签切换
    initSpecTabs();
    
    // 初始化产品图片切换
    initProductImages();
    
    // 初始化配置选择功能
    initConfiguration();
    
    // 初始化导航栏滚动效果
    initNavbarScroll();
});

// 规格标签切换功能
function initSpecTabs() {
    const tabs = document.querySelectorAll('.spec-tab');
    const contents = document.querySelectorAll('.spec-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // 添加当前活动状态
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });
}

// 产品图片切换功能
function initProductImages() {
    const thumbBtns = document.querySelectorAll('.thumb-btn');
    const mainImg = document.getElementById('main-product-img');
    
    thumbBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有缩略图的活动状态
            thumbBtns.forEach(b => b.classList.remove('active'));
            
            // 添加当前缩略图的活动状态
            btn.classList.add('active');
            
            // 更新主图片
            const newImgSrc = btn.getAttribute('data-img');
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = newImgSrc;
                mainImg.style.opacity = '1';
            }, 300);
        });
    });
}

// 配置选择功能（芯片、存储、颜色）
function initConfiguration() {
    // 价格数据
    const priceData = {
        'm3pro': {
            '512gb': 15999,
            '1tb': 17499,
            '2tb': 20499,
            '4tb': 25499,
            '8tb': 35499
        },
        'm3max': {
            '512gb': 22999,
            '1tb': 24499,
            '2tb': 27499,
            '4tb': 32499,
            '8tb': 42499
        }
    };
    
    // DOM 元素
    const chipOptions = document.querySelectorAll('.option-btn[data-chip]');
    const storageOptions = document.querySelectorAll('.option-btn[data-storage]');
    const colorOptions = document.querySelectorAll('.color-btn');
    const summaryChip = document.getElementById('summary-chip');
    const summaryStorage = document.getElementById('summary-storage');
    const summaryColor = document.getElementById('summary-color');
    const summaryPrice = document.getElementById('summary-price');
    const addToCartBtn = document.querySelector('.add-to-cart');
    
    // 当前选择
    let selectedChip = 'm3pro';
    let selectedStorage = '512gb';
    let selectedColor = 'space';
    
    // 更新价格和摘要
    function updateSummary() {
        const currentPrice = priceData[selectedChip][selectedStorage];
        
        // 更新摘要信息
        if (summaryChip) summaryChip.textContent = selectedChip === 'm3pro' ? 'M3 Pro' : 'M3 Max';
        if (summaryStorage) summaryStorage.textContent = selectedStorage.toUpperCase() + ' SSD';
        if (summaryColor) summaryColor.textContent = selectedColor === 'space' ? '深空灰色' : '银色';
        if (summaryPrice) summaryPrice.textContent = `¥${currentPrice.toLocaleString()}`;
        
        // 更新加入购物车按钮数据
        if (addToCartBtn) {
            addToCartBtn.setAttribute('data-chip', selectedChip);
            addToCartBtn.setAttribute('data-storage', selectedStorage);
            addToCartBtn.setAttribute('data-color', selectedColor);
            addToCartBtn.setAttribute('data-price', currentPrice);
        }
    }
    
    // 芯片选择
    chipOptions.forEach(option => {
        option.addEventListener('click', () => {
            chipOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            selectedChip = option.getAttribute('data-chip');
            updateSummary();
        });
    });
    
    // 存储选择
    storageOptions.forEach(option => {
        option.addEventListener('click', () => {
            storageOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            selectedStorage = option.getAttribute('data-storage');
            updateSummary();
        });
    });
    
    // 颜色选择
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            selectedColor = option.getAttribute('data-color');
            updateSummary();
        });
    });
    
    // 初始化摘要
    updateSummary();
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 确保DOM加载完成后再执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化配置
    initConfiguration();
});

document.addEventListener('DOMContentLoaded', function () {
    // 轮播图功能实现
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!slidesContainer || !slides || !prevButton || !nextButton || !dots) { //  检查所有必要元素是否存在
        console.log('轮播图元素未找到');
        return;
    }

    let currentIndex = 0;
    const slideCount = slides.length;

    // 更新轮播显示
    function updateCarousel() {
        // 计算平移距离
        const translateValue = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${translateValue}%)`;

        // 更新指示器状态
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    // 绑定按钮事件
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    // 绑定指示器事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // 自动轮播
    let autoplayInterval = setInterval(nextSlide, 5000);

    // 鼠标悬停时暂停自动轮播
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // 初始化轮播
    updateCarousel();
});

function updateSummary() {
    try {
        // 获取购物车中的商品
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        let itemCount = 0;
        
        // 计算总价和商品数量
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.item-price');
            const quantityElement = item.querySelector('.item-quantity');
            
            if (priceElement && quantityElement) {
                const price = parseFloat(priceElement.textContent.replace('¥', '')) || 0;
                const quantity = parseInt(quantityElement.textContent) || 0;
                
                total += price * quantity;
                itemCount += quantity;
            }
        });
        
        // 更新总结区域
        const summaryContainer = document.getElementById('summary-container');
        if (summaryContainer) {
            summaryContainer.innerHTML = `
                <div class="flex justify-between items-center">
                    <span>总计 (${itemCount} 件商品):</span>
                    <span class="text-xl font-bold">¥${total.toFixed(2)}</span>
                </div>
                <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    去结算
                </button>
            `;
        }
    } catch (error) {
        console.error('更新总结时出错:', error);
    }
}

// 其他可能的函数...