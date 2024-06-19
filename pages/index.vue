<script setup lang="ts"></script>
<template>
  <div class="cus-border w-full">
    <!-- * mb -->
    <section class="lg:hidden">
      <!-- ? banner -->
      <div class="grid grid-cols-3 items-center gap-4 p-4">
        <div class="col-span-1">
          <img src="~/assets/images/banner.png" alt="banner" class="pic-auto" />
        </div>
        <div class="col-span-2 text-[18px] font-semibold text-blue4">
          Yoo 歡迎來到鸚鸚食堂<br />讓我帶你認識一下我們網站吧！
        </div>
      </div>
      <hr class="cus-line-row" />

      <!-- ? info -->
      <div class="">
        <div class="card">
          <div class="card-pic cus-border-b">
            <img src="~/assets/images/p1.png" alt="banner" class="pic-auto" />
          </div>
          <div class="card-content">
            <p>
              不知道該給鸚鵡吃什麼？<br />
              輸入鸚鵡體重跟活動水平，我幫你推薦營養均衡的鮮食！
            </p>
            <p>
              除了根據營養需求隨機推薦食物之外，<br />
              買了飼料後建議攝取量看的霧煞煞，<br />
              我們可以根據體重計算鸚鵡每日需求攝取量，
              <br />還可以根據缺少熱量計算建議攝取量，<br />
              聽起來很酷，不來試試看嗎？
            </p>
            <div class="card-content-footer">
              <nuxt-link to="/calculator" class="cus-icon-btn-outline"
                ><Icon name="ph:bird" size="20"></Icon> 食物計算機
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="cus-border-y card-pic">
            <img src="~/assets/images/p2.png" alt="banner" class="pic-auto" />
          </div>
          <div class="card-content">
            <p>
              想要養鸚鵡卻怕功課做得不夠多？<br />
              看看營養指南，我們把鸚鵡的健康飲食資訊都放在那裡了！
            </p>
            <p>
              為了更好的保護鸚鵡寶貝們，<br />我們也準備了不可食用的食物資訊，<br />
              一起看看吧！
            </p>
            <div class="card-content-footer">
              <nuxt-link to="/food" class="cus-icon-btn-outline"
                ><Icon name="ph:bird" size="20"></Icon> 營養指南
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="cus-border-y card-pic">
            <img src="~/assets/images/p3.png" alt="banner" class="pic-auto" />
          </div>
          <div class="card-content">
            <p>
              想養鸚鵡但品種好多，而且都好可愛！<br />
              我們在百科全書整理了台灣常見飼養鸚鵡。
            </p>
            <p>
              在這裡，你可以找到不同鸚鵡特點和基本資料，<br />
              包括牠們的習性、說明、飼養優缺點，<br />
              一起找到最適合陪伴自己的那個 TA 吧！
            </p>
            <div class="card-content-footer">
              <nuxt-link to="/bird" class="cus-icon-btn-outline"
                ><Icon name="ph:bird" size="20"></Icon> 百科全書
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="cus-border-y card-pic">
            <img src="~/assets/images/p4.png" alt="banner" class="pic-auto" />
          </div>
          <div class="card-content">
            <p>
              需要帶鸚鵡去看醫生但不知道去哪裡？<br />
              我們整理了網路上的醫療資訊。
            </p>
            <p>
              為了讓鸚鵡寶貝健健康康的成長，<br />
              我們要先了解住家附近的醫療資源，<br />
              讓我們一起守護 TA 的健康吧！
            </p>
            <div class="card-content-footer">
              <nuxt-link to="/hospital" class="cus-icon-btn-outline"
                ><Icon name="ph:bird" size="20"></Icon> 醫護站
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="cus-border-y card-pic">
            <img src="~/assets/images/p5.png" alt="banner" class="pic-auto" />
          </div>
          <div class="card-content">
            <p>
              有任何問題需要幫助嗎？<br />
              在這裡可以聯繫到我們。
            </p>
            <p>
              無論是網站使用問題，<br />
              還是希望推出的更多功能，<br />
              我們都願意聽聽你的想法跟回饋！
            </p>
            <div class="card-content-footer">
              <nuxt-link to="/connect" class="cus-icon-btn-outline"
                ><Icon name="ph:bird" size="20"></Icon> 聯繫我們
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <hr class="cus-line-row" />

      <!-- ? text -->
      <div class="px-3 py-4 text-[14px] text-blue4">
        謝謝你們看到最後，科普一下網站由來，<br />
        因為我太想要養鸚鵡了，但是房東說不可以，<br />
        所以只能先寫一個食物計算機給未來的鸚鵡寶貝。<br />
        對了！我要養一隻凱克跟一隻藍和尚，<br />
        然後教牠們說：「救命啊，我變成鸚鵡了🦜」<br />
        (想知道長什麼樣子的話，可以看看頁面頂端的圖片)
        <div class="flex justify-end">
          <a
            href="https://profile.2fishs.com/"
            target="_blank"
            class="cus-link mt-3 flex justify-end gap-2"
          >
            作者
            <span class="cus-border-b">2魚</span>
          </a>
        </div>
      </div>
    </section>

    <!-- * pc -->
    <section class="hidden lg:block">
      <!-- ? banner -->
      <div class="grid grid-cols-12 items-center gap-4 p-4">
        <div class="col-span-2"></div>
        <div class="col-span-3">
          <img src="~/assets/images/banner.png" alt="banner" class="pic-auto" />
        </div>
        <div class="col-span-5 text-[32px] font-semibold text-blue4">
          Yoo 歡迎來到鸚鸚食堂<br />讓我帶你認識一下我們網站吧！
        </div>
        <div class="col-span-2"></div>
      </div>
      <hr class="cus-line-row" />

      <!-- ? info -->
      <div>
        <div class="">
          <div class="grid grid-cols-3">
            <div class="cus-border-r h-full">
              <img src="~/assets/images/p1.png" alt="banner" class="pic-auto" />
            </div>
            <div class="card-content-pc">
              <p>
                不知道該給鸚鵡吃什麼？<br />
                輸入鸚鵡體重跟活動水平，我幫你推薦營養均衡的鮮食！
              </p>
              <p>
                除了根據營養需求隨機推薦食物之外，<br />
                買了飼料後建議攝取量看的霧煞煞，<br />
                我們可以根據體重計算鸚鵡每日需求攝取量，
                <br />還可以根據缺少熱量計算建議攝取量，<br />
                聽起來很酷，不來試試看嗎？
              </p>
              <div class="card-content-footer-pc">
                <nuxt-link to="/calculator" class="cus-icon-btn-outline"
                  ><Icon name="ph:bird" size="20"></Icon> 食物計算機
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <hr class="cus-line-row" />

        <div class="">
          <div class="grid grid-cols-3">
            <div class="card-content-pc">
              <p>
                想要養鸚鵡卻怕功課做得不夠多？<br />
                看看營養指南，我們把鸚鵡的健康飲食資訊都放在那裡了！
              </p>
              <p>
                為了更好的保護鸚鵡寶貝們，<br />我們也準備了不可食用的食物資訊，<br />
                一起看看吧！
              </p>
              <div class="card-content-footer-pc">
                <nuxt-link to="/food" class="cus-icon-btn-outline"
                  ><Icon name="ph:bird" size="20"></Icon> 營養指南
                </nuxt-link>
              </div>
            </div>
            <div class="cus-border-l h-full">
              <img src="~/assets/images/p2.png" alt="banner" class="pic-auto" />
            </div>
          </div>
        </div>

        <hr class="cus-line-row" />

        <div class="">
          <div class="grid grid-cols-3">
            <div class="cus-border-r h-full">
              <img src="~/assets/images/p3.png" alt="banner" class="pic-auto" />
            </div>
            <div class="card-content-pc">
              <p>
                想養鸚鵡但品種好多，而且都好可愛！<br />
                我們在百科全書整理了台灣常見飼養鸚鵡。
              </p>
              <p>
                在這裡，你可以找到不同鸚鵡特點和基本資料，<br />
                包括牠們的習性、說明、飼養優缺點，<br />
                一起找到最適合陪伴自己的那個 TA 吧！
              </p>
              <div class="card-content-footer-pc">
                <nuxt-link to="/bird" class="cus-icon-btn-outline"
                  ><Icon name="ph:bird" size="20"></Icon> 百科全書
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <hr class="cus-line-row" />

        <div class="">
          <div class="grid grid-cols-3">
            <div class="card-content-pc">
              <p>
                需要帶鸚鵡去看醫生但不知道去哪裡？<br />
                我們整理了網路上的醫療資訊。
              </p>
              <p>
                為了讓鸚鵡寶貝健健康康的成長，<br />
                我們要先了解住家附近的醫療資源，<br />
                讓我們一起守護 TA 的健康吧！
              </p>
              <div class="card-content-footer-pc">
                <nuxt-link to="/hospital" class="cus-icon-btn-outline"
                  ><Icon name="ph:bird" size="20"></Icon> 醫護站
                </nuxt-link>
              </div>
            </div>
            <div class="cus-border-l h-full">
              <img src="~/assets/images/p4.png" alt="banner" class="pic-auto" />
            </div>
          </div>
        </div>

        <hr class="cus-line-row" />

        <div class="">
          <div class="grid grid-cols-3">
            <div class="cus-border-r h-full">
              <img src="~/assets/images/p5.png" alt="banner" class="pic-auto" />
            </div>
            <div class="card-content-pc">
              <p>
                有任何問題需要幫助嗎？<br />
                在這裡可以聯繫到我們。
              </p>
              <p>
                無論是網站使用問題，<br />
                還是希望推出的更多功能，<br />
                我們都願意聽聽你的想法跟回饋！
              </p>
              <div class="card-content-footer-pc">
                <nuxt-link to="/connect" class="cus-icon-btn-outline"
                  ><Icon name="ph:bird" size="20"></Icon> 聯繫我們
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="cus-line-row" />

      <!-- ? text -->
      <div class="p-4 text-blue4">
        謝謝你們看到最後，科普一下網站由來，<br />
        因為我太想要養鸚鵡了，但是房東說不可以，<br />
        所以只能先寫一個食物計算機給未來的鸚鵡寶貝。<br />
        對了！我要養一隻凱克跟一隻藍和尚，<br />
        然後教牠們說：「救命啊，我變成鸚鵡了🦜」<br />
        (想知道長什麼樣子的話，可以看看頁面頂端的圖片)
        <div class="flex justify-end">
          <a
            href="https://profile.2fishs.com/"
            target="_blank"
            class="cus-link mt-3 flex justify-end gap-2"
          >
            開發者
            <span class="cus-border-b">2魚</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
/* card */
.card {
  @apply -mb-[92px];
}

.card-pic {
  @apply flex max-h-[580px] items-center justify-center overflow-hidden;
}

.card-content {
  @apply m-3 mb-4 flex -translate-y-[92px] flex-col gap-2 rounded-md border border-blue4 bg-bg p-3 font-medium text-blue4;
}

.card-content-footer {
  @apply mt-1 flex justify-end;
}

.cus-icon-btn-outline {
  @apply flex items-center justify-center gap-[6px] rounded-md border border-blue4 px-4 py-[10px] text-[14px] font-semibold text-blue4;
}

.cus-link:hover {
  @apply text-blue3;
}

.cus-link:hover span {
  @apply border-blue3 text-blue3;
}

/* pc card */

.card-content-pc {
  @apply col-span-2 flex w-full flex-col justify-center gap-5 p-20 text-[20px] text-blue4;
}
.card-content-footer-pc {
  @apply flex justify-start;
}
</style>
