<?php
$target = '/home/newathulenergy/athul-backend/media';
$link = __DIR__ . '/media';

if (file_exists($link) || is_link($link)) {
    echo "Media link already exists!<br>";
} else {
    if (symlink($target, $link)) {
        echo "Successfully linked media folder!<br>";
    } else {
        echo "Failed to create symlink via PHP. Please run in cPanel Terminal: ln -s $target $link<br>";
    }
}

if (is_link($link)) {
    echo "Status: Connected to " . readlink($link);
}

