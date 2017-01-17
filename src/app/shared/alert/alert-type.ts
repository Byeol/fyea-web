export class AlertData {
  type: string;
  message: string;
};

export const AlertType = {
  loading: {
    type: 'info',
    message: '데이터를 불러오는 중입니다.'
  },
  error: {
    type: 'danger',
    message: '데이터를 불러오는 중에 오류가 발생했습니다.'
  },
  success: {
    type: 'success',
    message: '데이터를 성공적으로 불러왔습니다!'
  }
};
