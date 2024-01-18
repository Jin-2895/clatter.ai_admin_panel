import axios from 'axios';
import Toasts from '../../@core/components/react-toast';

async function startCsvDownload(csvUrl) {

  try {

    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = 'users.csv';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(csvUrl);
    Toasts({ message: "Document successfully Downloaded" })
  } catch (error) {
    Toasts({ error: error.message })
  }
}

export default startCsvDownload;
