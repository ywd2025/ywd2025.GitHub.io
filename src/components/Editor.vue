<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
import E from "wangeditor";
// import i18next from "i18next";
export default {
    name: "Editor",
    data() {
        return {
            editor: null,
            editorLanguage: null,
        };
    },
    props: {
        value: {
            default: "请填写内容"
        }
    },
    mounted() {
        this.editor = new E(this.$refs.editor);
        // const language = sessionStorage.getItem("lang")
        // if (language === "zh-CN") {
        //     this.editorLanguage = "zh-CN"
        // } else  if(language === "en_US"){
        //     this.editorLanguage = "en"
        // } else {
        //     this.editorLanguage = "zh-TW"
        // }
        // this.editor.config.lang = this.editorLanguage
        // this.editor.i18next = i18next
        this.editor.config.languages['zh_TW'] = {
            wangEditor: {
                插入: '插入',
                默认: '默認',
                创建: '創建',
                修改: '修改',
                如: '如',
                请输入正文: '請輸入正文',
                menus: {
                    title: {
                        标题: '標題',
                        加粗: '加粗',
                        字号: '字號',
                        字体: '字體',
                        斜体: '斜體',
                        下划线: '下劃綫',
                        删除线: '刪除綫',
                        缩进: '縮進',
                        行高: '行高',
                        文字颜色: '文字顔色',
                        背景色: '背景色',
                        链接: '鏈接',
                        序列: '序列',
                        对齐: '對齊',
                        引用: '引用',
                        表情: '表情',
                        图片: '圖片',
                        视频: '視頻',
                        表格: '表格',
                        代码: '代碼',
                        分割线: '分割綫',
                        恢复: '恢復',
                        撤销: '撤銷',
                        全屏: '全屏',
                        代办事项: '待辦事項',
                    },
                    dropListMenu: {
                        设置标题: '設置標題',
                        背景颜色: '背景顏色',
                        文字颜色: '文字顔色',
                        设置字号: '設置字號',
                        设置字体: '設置字體',
                        设置缩进: '設置縮進',
                        对齐方式: '對齊方式',
                        设置行高: '設置行高',
                        序列: '序列',
                        head: {
                            正文: '正文',
                        },
                        indent: {
                            增加缩进: '增加縮進',
                            减少缩进: '減少縮進',
                        },
                        justify: {
                            靠左: '靠左',
                            居中: '居中',
                            靠右: '靠右',
                        },
                        list: {
                            无序列表: '無序列表',
                            有序列表: '有序列表',
                        },
                    },
                    panelMenus: {
                        emoticon: {
                            默认: '默認',
                            新浪: '新浪',
                            emoji: 'emoji',
                            手势: '手勢',
                        },
                        image: {
                            图片链接: '圖片連結',
                            上传图片: '上傳圖片',
                            网络图片: '網絡圖片',
                        },
                        link: {
                            链接: '連結',
                            链接文字: '連結文字',
                            删除链接: '删除連結',
                            查看链接: '查看連結',
                        },
                        video: {
                            插入视频: '插入視頻',
                        },
                        table: {
                            行: '行',
                            列: '列',
                            的: '的',
                            表格: '表格',
                            添加行: '添加行',
                            删除行: '删除行',
                            添加列: '添加列',
                            删除列: '删除列',
                            设置表头: '設定表頭',
                            取消表头: '取消表頭',
                            插入表格: '插入表格',
                            删除表格: '删除表格',
                        },
                        code: {
                            删除代码: '删除程式碼',
                            修改代码: '修改程式碼',
                            插入代码: '插入程式碼',
                        },
                    },
                },
                validate: {
                    张图片: '張圖片',
                    大于: '大於',
                    图片链接: '圖片連結',
                    不是图片: '不是圖片',
                    返回结果: '返回結果',
                    上传图片超时: '上傳圖片超時',
                    上传图片错误: '上傳圖片錯誤',
                    上传图片失败: '上傳圖片失敗',
                    插入图片错误: '插入圖片錯誤',
                    一次最多上传: '一次最多上傳',
                    下载链接失败: '下載連結失敗',
                    图片验证未通过: '圖片驗證未通過',
                    服务器返回状态: '服務器返回狀態',
                    上传图片返回结果错误: '上傳圖片返回結果錯誤',
                    请替换为支持的图片类型: '請替換為支持的圖片類型',
                    您插入的网络图片无法识别: '您插入的網絡圖片無法識別',
                    您刚才插入的图片链接未通过编辑器校验: '您剛才插入的圖片連結未通過編輯器校驗',
                },
            }
        }
        // console.log(i18next)
        this.editor.config.menus = [
            // 自定义菜单配置
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "link", // 插入链接
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            // "emoticon", // 表情
            "image", // 插入图片
            // "table", // 表格
            // "video", // 插入视频
            // "code", // 插入代码
            "undo", // 撤销
            "redo" // 重复
        ];
        this.editor.config.uploadImgServer = this.$imageUrl  // 上传图片到服务器
        this.editor.config.uploadImgMaxSize = 10 * 1024 * 1024
        this.editor.config.uploadFileName = 'file'
        this.editor.config.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                
                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
                
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                console.log("图片上传成功", xhr, editor, result)
                // Message.success("图片上传成功")
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                // Message.error("图片上传失败")
                console.log("图片上传失败", xhr, editor, result)
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                // Message.error("图片上传失败")
                console.log("图片上传失败", xhr, editor, result)
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                // Message.error("图片上传超时")
                console.log("图片上传超时", xhr, editor, result)
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.data
                insertImg(url)

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }
        this.editor.create();
        console.log(this.value)
        this.editor.txt.html(this.value); // 设置内容
        this.editor.config.onchange = html => {
            // 获取内容
            this.$emit("input", html);
        };
    }
};
</script>

<style scoped>
</style>
