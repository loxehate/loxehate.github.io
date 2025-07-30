hexo.extend.filter.register('theme_inject', function (injects) {
  injects.footer.raw('custom-title-change', `
    <script>
      (function () {
        var originalTitle = document.title;
        var titleTimer;

        document.addEventListener('visibilitychange', function () {
          if (document.hidden) {
            document.title = '你别走啊~ (╥﹏╥)';
            clearTimeout(titleTimer);
          } else {
            document.title = '欢迎回来！(＾Ｕ＾)ノ~';
            titleTimer = setTimeout(function () {
              document.title = originalTitle;
            }, 2000);
          }
        });
      })();
    </script>
  `);
});
