const Mock = require("mockjs");
Mock.mock("/api/admin/param/lists", {
	"code": 0,
	"info": "\u6210\u529f",
	"data": {
		"watch": [{
			"code": "1",
			"name": "\u4e0d\u89c4\u8303\u7528\u9910",
			"type": "watch",
			"other": "0"
		}, {
			"code": "3",
			"name": "\u5355\u72ec\u8baf\u95ee",
			"type": "watch",
			"other": "0"
		}, {
			"code": "2",
			"name": "\u62bd\u70df",
			"type": "watch",
			"other": "0"
		}, {
			"code": "4",
			"name": "\u9ad8\u8840\u538b",
			"type": "watch",
			"other": "0"
		}, {
			"code": "5",
			"name": "\u4f53\u6e29\u5f02\u5e38",
			"type": "watch",
			"other": "0"
		}, {
			"code": "6",
			"name": "\u672a\u5173\u95e8",
			"type": "watch",
			"other": "0"
		}, {
			"code": "7",
			"name": "\u672a\u4f7f\u7528\u4e13\u7528\u9910\u5177",
			"type": "watch",
			"other": "0"
		}, {
			"code": "8",
			"name": "\u65e0\u5973\u6027\u8c08\u8bdd\u4eba\u966a\u540c",
			"type": "watch",
			"other": "0"
		}],
		"room": [{
			"code": "1",
			"name": "\u4e00\u822c\u8c08\u8bdd\u5ba4",
			"type": "room",
			"other": "0"
		}, {
			"code": "2",
			"name": "\u6e29\u99a8\u8c08\u8bdd\u5ba4",
			"type": "room",
			"other": "0"
		}, {
			"code": "3",
			"name": "\u8d70\u8bfb\u5f0f\u8c08\u8bdd\u5ba4",
			"type": "room",
			"other": "0"
		}],
		"sex": [{
			"code": "0",
			"name": "\u5973",
			"type": "sex",
			"other": "0"
		}, {
			"code": "1",
			"name": "\u7537",
			"type": "sex",
			"other": "0"
		}],
		"member": [{
			"code": "1",
			"name": "\u529e\u6848\u4eba\u5458",
			"type": "member",
			"other": "0"
		}, {
			"code": "2",
			"name": "\u7ba1\u7406\u4eba\u5458",
			"type": "member",
			"other": "0"
		}, {
			"code": "3",
			"name": "\u5b89\u4fdd\u4eba\u5458",
			"type": "member",
			"other": "0"
		}, {
			"code": "4",
			"name": "\u4fdd\u6d01\u4eba\u5458",
			"type": "member",
			"other": "0"
		}, {
			"code": "5",
			"name": "\u5176\u4ed6\u4eba\u5458",
			"type": "member",
			"other": "0"
		}],
		"point": [{
			"code": "1",
			"name": "<ul data-v-73658b21=\"\" style=\"list-style-type: none;\" class=\" list-paddingleft-2\"><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">1.\u672c\u573a\u6240\u7981\u6b62\u5438\u70df\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">2.\u8bf7\u52ff\u5728\u573a\u6240\u5185\u5927\u58f0\u55a7\u54d7\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">3.\u56e0\u573a\u6240\u6d89\u5bc6\uff0c\u8bf7\u52ff\u5728\u516c\u5171\u533a\u57df\u8ba8\u8bba\u6848\u60c5\uff0c\u907f\u514d\u6848\u4ef6\u4fe1\u606f\u6cc4\u9732\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">4.\u573a\u6240\u5982\u53d1\u751f\u7a81\u53d1\u4e8b\u4ef6\u8bf7\u542c\u4ece\u573a\u6240\u7ba1\u7406\u4eba\u5458\u73b0\u573a\u6307\u6325\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">5.\u5149\u76d8\u4e3a\u540c\u6b65\u523b\u5f55\uff0c\u56e0\u529e\u6848\u7ec4\u5de5\u4f5c\u4eba\u5458\u758f\u6f0f\u3001\u573a\u6240\u8bbe\u5907\u6545\u969c\u7b49\u539f\u56e0\u9700\u8865\u523b\u7684\uff0c\u7531\u529e\u6848. \u7ec4\u3001\u7559\u7f6e\u7ba1\u7406\u4e2d\u5fc3\u5206\u522b\u62a5\u76f8\u5173\u59d4\u9886\u5bfc\u5ba1\u6279\u540c\u610f\u540e\uff0c\u7531\u6848\u7ba1\u5ba4\u3001\u6280\u672f\u4fdd\u969c\u5ba4\u8865\u523b\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">6.\u8c08\u8bdd\u5bf9\u8c61\u8fdb\u5165\u573a\u6240\u540e\uff0c\u7531\u529e\u6848\u7ec4\u5168\u7a0b\u966a\u540c\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">7.\u8c08\u8bdd\u5bf9\u8c61\u51fa\u73b0\u8840\u538b\u8fc7\u9ad8\uff0c\u5fc3\u7387\u8fc7\u5feb\u7b49\u8eab\u4f53\u5f02\u5e38\u60c5\u51b5\uff0c\u8bf7\u53ca\u65f6\u901a\u77e5\u9a7b\u70b9\u533b\u52a1\u4eba\u5458\u5904\u7f6e\uff0c\u786e\u4fdd\u8c08\u8bdd\u5bf9\u8c61\u7684\u751f\u547d\u5b89\u5168\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">8.\u7528\u9910\u8bf7\u63d0\u524d\u5728\u5b89\u4fdd\u5904\u9886\u53d6\u9910\u5238\uff0c\u81ea\u884c\u5b89\u5168\u9886\u53d6\u9910\u98df\u3002</span></p></li><li><p style=\"line-height: 3em;\"><span style=\"font-size: 18px;\">9.\u8c08\u8bdd\u5bf9\u8c61\u7528\u9910\u5fc5\u987b\u4f7f\u7528\u5b89\u5168\u4e13\u7528\u52fa\u3002</span></p></li><li><p style=\"line-height: 3em;\">10.\u8c08\u8bdd\u5bf9\u8c61\u4e66\u5199\u5fc5\u987b\u4f7f\u7528\u5b89\u5168\u4e13\u7528\u7b14\u3002</p></li><li><p style=\"line-height: 3em;\">11.\u8c08\u8bdd\u7ed3\u675f\u540e\u8bf7\u5c06U\u76d8\u7b49\u7535\u5b50\u5b58\u50a8\u8bbe\u5907\u4ee5\u53ca\u8c08\u8bdd\u5ba4\u5185\u6240\u6709\u7684\u7eb8\u5c51\u3001\u7eb8\u5f20\u3001\u8d44\u6599\u7b49\u76f8\u5173\u7269\u54c1\u5e26\u79bb\uff0c\u786e\u4fdd\u65e0\u7269\u54c1\u9057\u7559\u3002</p></li></ul>",
			"type": "point",
			"other": "0"
		}]
	},
	"url": ""
});