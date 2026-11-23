<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Athul Energy - System Setup & Diagnostics</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; padding: 30px; color: #1e293b; }
        .card { max-width: 650px; margin: 0 auto; background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        h1 { font-size: 20px; margin-bottom: 20px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; }
        .item { padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; font-size: 14px; }
        .success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
        .error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
        .warning { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }
        .badge { font-weight: 600; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .badge-success { background: #22c55e; color: white; }
        .badge-error { background: #ef4444; color: white; }
        .badge-warning { background: #f59e0b; color: white; }
        code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
    </style>
</head>
<body>
<div class="card">
    <h1>🚀 Athul Energy - System Diagnostic & Media Setup</h1>

    <?php
    $backend_dir = '/home/newathulenergy/athul-backend';
    $backend_media = $backend_dir . '/media';
    $public_media = __DIR__ . '/media';

    // 1. Ensure backend media directories exist
    $subdirs = ['gallery', 'blog', 'downloads', 'clients'];
    if (!file_exists($backend_media)) {
        @mkdir($backend_media, 0755, true);
    }
    foreach ($subdirs as $sub) {
        $sub_path = $backend_media . '/' . $sub;
        if (!file_exists($sub_path)) {
            @mkdir($sub_path, 0755, true);
        }
    }

    // 2. Setup Symlink in public_html
    $symlink_ok = false;
    $symlink_msg = '';

    if (is_link($public_media)) {
        $target = readlink($public_media);
        $symlink_ok = true;
        $symlink_msg = "Media symlink is active and points to: <code>" . htmlspecialchars($target) . "</code>";
    } elseif (file_exists($public_media) && is_dir($public_media)) {
        $symlink_msg = "<code>public_html/media</code> exists as a directory (not symlink). Uploaded photos in backend won't auto-sync unless linked.";
    } else {
        // Try php symlink()
        if (function_exists('symlink')) {
            $created = @symlink($backend_media, $public_media);
            if ($created) {
                $symlink_ok = true;
                $symlink_msg = "Successfully created symlink from backend media to public_html/media!";
            }
        }

        // Try shell_exec if symlink failed
        if (!$symlink_ok && function_exists('shell_exec')) {
            @shell_exec("ln -s " . escapeshellarg($backend_media) . " " . escapeshellarg($public_media));
            if (is_link($public_media)) {
                $symlink_ok = true;
                $symlink_msg = "Created symlink using shell command!";
            }
        }

        if (!$symlink_ok) {
            $symlink_msg = "Could not automatically create symlink. See Cron Job workaround below.";
        }
    }

    if ($symlink_ok) {
        echo "<div class='item success'><div><strong>Media Symlink:</strong> {$symlink_msg}</div><span class='badge badge-success'>OK</span></div>";
    } else {
        echo "<div class='item warning'><div><strong>Media Symlink:</strong> {$symlink_msg}</div><span class='badge badge-warning'>ACTION NEEDED</span></div>";
    }

    // 3. Test Database Connection
    $env_file = $backend_dir . '/.env';
    $db_ok = false;
    $db_msg = '';

    if (file_exists($env_file)) {
        $env_content = file_get_contents($env_file);
        preg_match('/DB_HOST=(.*)/', $env_content, $m_host);
        preg_match('/DB_USER=(.*)/', $env_content, $m_user);
        preg_match('/DB_PASSWORD=(.*)/', $env_content, $m_pass);
        preg_match('/DB_NAME=(.*)/', $env_content, $m_name);
        preg_match('/DB_PORT=(.*)/', $env_content, $m_port);

        $db_host = trim($m_host[1] ?? 'localhost');
        $db_user = trim($m_user[1] ?? '');
        $db_pass = trim($m_pass[1] ?? '');
        $db_name = trim($m_name[1] ?? '');
        $db_port = (int)trim($m_port[1] ?? 3306);

        try {
            $mysqli = @new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
            if ($mysqli->connect_error) {
                $db_msg = "MySQL Connection failed: " . htmlspecialchars($mysqli->connect_error);
            } else {
                $db_ok = true;
                $db_msg = "Connected successfully to database <code>{$db_name}</code> on {$db_host}:{$db_port}!";
                $mysqli->close();
            }
        } catch (Exception $e) {
            $db_msg = "MySQL Error: " . htmlspecialchars($e->getMessage());
        }
    } else {
        $db_msg = "Backend .env file not found at {$env_file}";
    }

    if ($db_ok) {
        echo "<div class='item success'><div><strong>Database Check:</strong> {$db_msg}</div><span class='badge badge-success'>CONNECTED</span></div>";
    } else {
        echo "<div class='item error'><div><strong>Database Check:</strong> {$db_msg}</div><span class='badge badge-error'>FAILED</span></div>";
    }
    ?>

    <?php if (!$symlink_ok): ?>
    <div style="margin-top: 20px; padding: 14px; background: #eff6ff; border-radius: 8px; font-size: 13px; line-height: 1.6; border: 1px solid #bfdbfe;">
        <strong>How to create the media symlink without Terminal (via cPanel Cron Jobs):</strong>
        <ol style="margin: 8px 0 0 16px; padding: 0;">
            <li>In cPanel, click <strong>Cron Jobs</strong> (under "Advanced").</li>
            <li>In <em>Common Settings</em>, choose <strong>Once a minute</strong> (* * * * *).</li>
            <li>In <em>Command</em>, paste this exact line:
                <br><code>ln -s /home/newathulenergy/athul-backend/media /home/newathulenergy/public_html/media</code>
            </li>
            <li>Click <strong>Add New Cron Job</strong>.</li>
            <li>Wait 1 minute, refresh this page (status will turn green), then <strong>Delete</strong> the cron job!</li>
        </ol>
    </div>
    <?php endif; ?>

    <p style="font-size: 12px; color: #64748b; margin-top: 20px; text-align: center;">
        Athul Energy Consultants &copy; 2026. Delete this file after setup is verified.
    </p>
</div>
</body>
</html>
