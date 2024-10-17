body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 20px;
}
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
.category-box {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 15px;
}
.category-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}
.category-title img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}
.service-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.service-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    font-size: 14px;
}
.service-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
}
.see-all {
    font-size: 12px;
    color: #007bff;
    text-decoration: none;
    display: block;
    margin-top: 10px;
}
