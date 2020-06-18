var app = new Vue({
    el: '#app',
    data: {
      equation: '0',
      isDecimalAdded: false,
      isOperatorAdded: false,
      isStarted: false,
    },
    methods: {
      isOperator(character) {
        return ['+', '-', '×', '÷'].indexOf(character) > -1
      },
      append(character) {
        if (this.equation === '0' && !this.isOperator(character)) {
          if (character === '.') {
            this.equation += '' + character
            this.isDecimalAdded = true
          } else {
            this.equation = '' + character
          }
          
          this.isStarted = true
          return
        }
        
        if (!this.isOperator(character)) {
          if (character === '.' && this.isDecimalAdded) {
            return
          }
          
          if (character === '.') {
            this.isDecimalAdded = true
            this.isOperatorAdded = true
          } else {
            this.isOperatorAdded = false
          }
          
          this.equation += '' + character
        }
        
        if (this.isOperator(character) && !this.isOperatorAdded) {
          this.equation += '' + character
          this.isDecimalAdded = false
          this.isOperatorAdded = true
        }
      },
      
      //等于操作
      calculate() {
        let result = this.equation.replace(new RegExp('×', 'g'), '*').replace(new RegExp('÷', 'g'), '/')
        
        this.equation = parseFloat(eval(result).toFixed(9)).toString()
        this.isDecimalAdded = false
        this.isOperatorAdded = false
      },
      
      //加减操作
      calculateToggle() {
        if (this.isOperatorAdded || !this.isStarted) {
          return
        }
        
        this.equation = this.equation + '* -1'
        this.calculate()
      },
      
      //除法操作
      calculatePercentage() {
        if (this.isOperatorAdded || !this.isStarted) {
          return
        }
        
        this.equation = this.equation + '* 0.01'
        this.calculate()
      },
      
      //清空操作
      clear() {
        this.equation = '0'
        this.isDecimalAdded = false
        this.isOperatorAdded = false
        this.isStarted = false
      }
    }
  });