function InitInput(name, label, type) {
  this.name = name;
  this.label = label;
  this.errorMessage = '';
  this.value = '';
  this.type = type;
}

function InitState() {
  this.firstName = new InitInput('firstName', 'Имя', 'text');
  this.lastName = new InitInput('lastName', 'Фамилия', 'text');
  this.dateBirth = new InitInput('dateBirth', 'Дата Рождения', 'date');
  this.phoneNumber = new InitInput('phoneNumber', 'Телефон', 'text');
  this.userSite = new InitInput('userSite', 'Сайт', 'text');
  this.userBio = new InitInput('userBio', 'О себе', 'textArea');
  this.userStack = new InitInput('userStack', 'Стек технологий', 'textArea');
  this.userProject = new InitInput('userProject', 'Описание последнего проекта', 'textArea');
}


export default InitState;