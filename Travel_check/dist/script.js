new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // 현재 카드 배경 이미지를 무작위로 설정하는 변수
      cardName: "", // 카드 소유자의 이름을 저장하는 변수
      cardNumber: "", // 카드 번호를 저장하는 변수
      cardMonth: "", // 카드의 만료 월을 저장하는 변수
      cardYear: "", // 카드의 만료 년도를 저장하는 변수
      cardCvv: "", // 카드의 CVV 번호를 저장하는 변수
      minCardYear: new Date().getFullYear(), // 최소 카드 만료 년도를 현재 연도로 설정하는 변수
      amexCardMask: "#### ###### #####", // American Express 카드의 마스킹 패턴을 정의하는 변수
      otherCardMask: "#### #### #### ####", // 다른 카드들의 마스킹 패턴을 정의하는 변수
      cardNumberTemp: "", // 카드 번호의 임시 값 저장 변수
      isCardFlipped: false, // 카드의 뒷면 플립 여부를 저장하는 변수
      focusElementStyle: null, // 입력 필드에 포커스가 있는 경우 스타일을 저장하는 변수
      isInputFocused: false // 입력 필드에 포커스가 있는지 여부를 저장하는 변수
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask; // 카드 번호의 임시 값에 다른 카드들의 마스킹 패턴을 할당
    document.getElementById("cardNumber").focus(); // 페이지가 로드될 때 카드 번호 입력 필드에 포커스 설정
  },
  computed: {
    getCardType () { // 입력된 카드 번호를 기반으로 카드의 종류를 판별하는 계산된 속성
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // 기본 카드 종류는 Visa로 설정
    },
		generateCardNumberMask () { // 카드의 종류에 따라 카드 번호의 마스킹 패턴을 생성하는 계산된 속성
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () { // 최소 카드 만료 월을 계산하는 계산된 속성
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () { // 카드의 만료 년도가 변경되면 실행되는 감시자(watch)
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    submitForm() { // 양식을 제출하는 메서드
      if (this.cardNumber === "" || this.cardNumber.replace(/\s/g,"").length !==16|| this.cardName === "" || this.cardMonth === "" || this.cardYear === "" || this.cardCvv === "" || this.cardCvv.replace(/\s/g, "").length !== 3) {
        alert("모든 항목을 입력해주세요."); // 필수 항목이 비어 있거나 유효하지 않은 경우 경고 메시지 표시
        if(this.cardNumber.replace(/\s/g,"").length !==16)
          alert("카드번호는 16자리입니다."); // 카드 번호가 16자리가 아닌 경우에 대한 경고 메시지 표시
        if(this.cardCvv.replace(/\s/g, "").length !== 3)
          alert("CVC는 3자리입니다."); // CVV 번호가 4자리가 아닌 경우에 대한 경고 메시지 표시
      } else {
        alert('카드 등록이 완료되었습니다!\nHOME버튼을 눌러 메인페이지로 이동하세요.'); // 유효한 양식으로 제출한 경우에 대한 알림 메시지 표시
      }
    },
    flipCard (status) { // 카드를 뒤집는 메서드
      this.isCardFlipped = status;
    },
    focusInput (e) { // 입력 필드에 포커스가 있는 경우 호출되는 메서드
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() { // 입력 필드에서 포커스가 사라진 경우 호출되는 메서드
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
});
