import { nextTick } from 'vue';
/**
 * 文件大小格式化选项
 */
interface FormatOptions {
  decimals?: number;
  unit?: 'auto' | 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB';
  short?: boolean;
  space?: boolean;
  base?: 1000 | 1024;
}

/**
 * 格式化文件大小
 */
function formatFileSize(bytes: number, options: FormatOptions = {}): string {
  const {
    decimals = 2,
    unit = 'auto',
    short = false,
    space = true,
    base = 1024
  } = options;
  
  if (bytes === 0) return `0${space ? ' ' : ''}${short ? 'B' : 'Bytes'}`;
  
  const k = base;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const sizes = short 
    ? ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
    : base === 1024
      ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
      : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${size}${space ? ' ' : ''}${sizes[i]}`;
}


 function scrollToBottom() {
    nextTick(() =>{
      console.log('执行滚动')
      document.getElementById('messageContainer')?.lastElementChild?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end' 
      });
    })
  }

export { formatFileSize, type FormatOptions, scrollToBottom };