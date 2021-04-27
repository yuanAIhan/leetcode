「那么我给大家归纳如下三点」：

求最小公共祖先，需要从底向上遍历，那么二叉树，只能通过后序遍历（即：回溯）实现从低向上的遍历方式。

在回溯的过程中，必然要遍历整颗二叉树，即使已经找到结果了，依然要把其他节点遍历完，因为要使用递归函数的返回值（也就是代码中的left和right）做逻辑判断。

要理解如果返回值left为空，right不为空为什么要返回right，为什么可以用返回right传给上一层结果。


「如果找到一个节点，发现左子树出现结点p，右子树出现节点q，
  或者 左子树出现结点q，右子树出现节点p，那么该节点就是节点p和q的最近公共祖先。」

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (root == q || root == p || root == NULL) return root;
        //这段代码的逻辑就保证了返回的要么是等于p/q的，或者是等于空的。所以下面的递归获取的值要么就是这三个值得。
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left != NULL && right != NULL) return root; 
        //这个时候上来的都不是空的，那么可以返回对应的现在当前的节点的，因为当前的left和right都不是空的。

        if (left == NULL && right != NULL) return right;
        else if (left != NULL && right == NULL) return left;
        //同样的
        else  { //  (left == NULL && right == NULL)
            return NULL;
        }
        
    }

};



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
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(root == p || root == q || !root) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if(left != NULL && right != NULL) return root;
        if(left == NULL && right != NULL) return right;
        if(left != NULL && right == NULL) return left;
        // if(left == NULL && right == NULL) return NULL;
        return NULL;
    }
};

//一般涉及有回溯的思想的时候则对应的应该是完成其中的后序遍历的方式来实现。