// 语言资源导入
import zhCN from '../assets/locales/zh-CN';
import enUS from '../assets/locales/en-US';
import jaJP from '../assets/locales/ja-JP';

// 定义语言资源类型
interface LanguageResources {
  [key: string]: any;
}

// 语言资源配置
const resources: LanguageResources = {
  'zh-CN': zhCN,
  'zh': zhCN,
  'en-US': enUS,
  'en': enUS,
  'ja-JP': jaJP,
  'ja': jaJP,
};

// 创建i18n类
class I18n {
  private currentLanguage: string;
  private supportedLanguages: string[];

  constructor() {
    this.supportedLanguages = Object.keys(resources);
    // 检测浏览器语言
    this.currentLanguage = this.detectLanguage();
  }

  // 检测浏览器语言
  private detectLanguage(): string {
    // 获取浏览器支持的语言列表
    const browserLanguages = navigator.languages || [navigator.language || (navigator as any).browserLanguage];
    
    // 遍历浏览器支持的语言列表，找到第一个匹配的应用支持的语言
    for (const lang of browserLanguages) {
      if (this.supportedLanguages.includes(lang)) {
        return lang;
      }
      // 检查语言的前缀是否匹配（例如'en'匹配'en-US'）
      const prefix = lang.split('-')[0];
      const matchedLang = this.supportedLanguages.find(supportedLang => supportedLang.startsWith(prefix));
      if (matchedLang) {
        return matchedLang;
      }
    }
    
    // 如果没有匹配的语言，默认返回英语
    return 'en-US';
  }

  // 获取当前语言
  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  // 设置语言
  public setLanguage(language: string): void {
    if (this.supportedLanguages.includes(language)) {
      this.currentLanguage = language;
    }
  }

  // 翻译文本
  public t(key: string): string {
    const keys = key.split('.');
    let value: any = resources[this.currentLanguage];
    
    for (const k of keys) {
      if (!value) return key;
      value = value[k];
    }
    
    return value || key;
  }

  // 获取支持的语言列表
  public getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }
}

// 导出i18n实例
const i18n = new I18n();
export default i18n;