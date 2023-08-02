import { toast, Id } from 'react-toastify';

import { ICONS } from './icons';
import notifications from '../data/ErrorData.json';

type toastKind = 'success' | 'error' | 'warning';

const notificate = (toastKind: toastKind, header: string, text: string): Id => {
  const toastSetup = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: notifications.autoCloseTime as number,
    className:
      toastKind === 'error'
        ? ICONS.TOAST_ERROR
        : toastKind === 'warning'
        ? ICONS.TOAST_WARNING
        : ICONS.TOAST_SUCCESS,
  };

  return toast[toastKind](`${header ? header + '\n' + text : text}`, toastSetup);
};

export default notificate;
