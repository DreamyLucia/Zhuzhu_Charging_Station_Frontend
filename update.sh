#!/usr/bin/fish
# 不要使用bash运行，直接 ./update.sh 运行
nvm

# 初始化参数值
set -l branch ""

# 解析命令行参数
for i in (seq 1 (count $argv))
    switch $argv[$i]
        case --branch
            if test (count $argv) -gt $i
                set branch $argv[(math $i + 1)]
            end
    end
end

# 如果指定了参数，那么赋值 confirmation 为 y
if test -n "$branch"
    set confirmation "y"
else
    echo "是否重启服务？(y/n)"
    read confirmation
end

if echo "$confirmation" | string match -r "[Yy]"
    nvm
    # 如果 $branch 为空，那么读取输入
    if test -z "$branch"
        echo "输入需要切换的分支："
        read branch
    end
    # 恢复分支，防止拉取失败
    git restore .
    echo "切换到分支：$branch"
    git checkout $branch
    git branch --set-upstream-to=origin/$branch $branch
    echo "从github拉取代码..."
    git pull
    # 更新依赖
    pnpm i
    # 构建
    pnpm build
    # 重启服务
    cd docker
    docker compose up --build -d
else
    echo "取消更新"
end
