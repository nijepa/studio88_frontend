import dayjs from 'dayjs';
import srb from 'dayjs/locale/sr';

dayjs.locale(srb);
export default {
  methods: {
    customFormatter(date) {
      return dayjs(date).format('DD MMM YYYY');
    },
  },
};
