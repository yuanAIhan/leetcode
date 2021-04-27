//在递归中记录当前节点的前一个节点的方式代码
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int result = INT_MAX;
    TreeNode* pre;
    void traversal(TreeNode* cur) {
        if(cur == NULL) return;
        traversal(cur->left); //左
        if(pre != NULL) { //中
            result = std::min(result, cur->val - pre->val);
        }
        pre = cur;
        traversal(cur -> right); //右
    }
    int getMinimumDifference(TreeNode* root) {
        traversal(root);
        return result;
    }
};

//首先是利用对应的中序的方式完成从小到大的遍历方式实现。
//然后每一次记录之前的一个节点之后然后前后的两者相减的方式实现。
递归的时候不一定想着就是使用其中的前序的方式，其它的遍历方式的时候只是将其中的对于根节点的操作的代码
//放在具体的遍历的位置处即可！