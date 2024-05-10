export default {
    //  下载文件方法
    downLoadFile(res, fileName) {
        const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", encoding: 'UTF-8' })
        const aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = window.URL.createObjectURL(blob);
        aLink.download = fileName + '.docx'; // 添加扩展名
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        return
    },
}