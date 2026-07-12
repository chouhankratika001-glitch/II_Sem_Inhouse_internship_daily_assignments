<?php
$conn = mysqli_connect("localhost", "root", "", "students_management");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM students";
$result = mysqli_query($conn, $sql);

$total_students = mysqli_num_rows($result);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Students Records</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body{
            background:#f4f6f9;
        }

        .container-box{
            margin-top:40px;
            background:white;
            padding:30px;
            border-radius:15px;
            box-shadow:0px 0px 15px rgba(0,0,0,0.1);
        }

        h2{
            text-align:center;
            margin-bottom:20px;
            color:#0d6efd;
        }

        img{
            width:60px;
            height:60px;
            border-radius:50%;
            object-fit:cover;
        }
    </style>
</head>

<body>

<div class="container">
    <div class="container-box">

        <h2>Student Management System</h2>

        <table class="table table-bordered table-hover">

            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>College</th>
                    <th>Branch</th>
                    <th>Course</th>
                    <th>CGPA</th>
                    <th>Address</th>
                    <th>Date Registered</th>
                </tr>
            </thead>

            <tbody>

            <?php
            while($row = mysqli_fetch_assoc($result))
            {
                $rowClass = "";

                if($row['CGPA'] > 8.0)
                {
                    $rowClass = "table-success";
                }
            ?>

                <tr class="<?php echo $rowClass; ?>">

                    <td><?php echo $row['id']; ?></td>

                    <td>
                        <?php
                        if(!empty($row['photo']))
                        {
                            echo "<img src='uploads/".$row['photo']."'>";
                        }
                        else
                        {
                            echo "No Photo";
                        }
                        ?>
                    </td>

                    <td><?php echo $row['name']; ?></td>
                    <td><?php echo $row['college']; ?></td>
                    <td><?php echo $row['branch']; ?></td>
                    <td><?php echo $row['course']; ?></td>
                    <td><?php echo $row['CGPA']; ?></td>
                    <td><?php echo $row['address']; ?></td>
                    <td><?php echo $row['date_registered']; ?></td>

                </tr>

            <?php
            }
            ?>

            </tbody>

        </table>

        <div class="alert alert-primary text-center">
            <strong>Total Students: <?php echo $total_students; ?></strong>
        </div>

    </div>
</div>

</body>
</html>