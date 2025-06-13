hexo.extend.filter.register('theme_inject', function (injects) {
  // 注入容器到 body 的顶部
  injects.bodyBegin.raw('particles-div', `
    <div id="particles-js" style="position: fixed; z-index: 0; width: 100%; height: 100%; top: 0; left: 0;"></div>
  `);

  // 注入脚本到页面底部 footer
  injects.footer.raw('particles-script', `
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script>
      particlesJS.load("particles-js", "/js/particles-config.json", function () {
        console.log("🌌 particles.js loaded.");
      });
    </script>
  `);
});
