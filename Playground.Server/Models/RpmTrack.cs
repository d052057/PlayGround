﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace PlayGround.Server.Models;

public partial class RpmTrack
{
    public Guid RecordId { get; set; }

    public Guid RpmId { get; set; }

    public string Title { get; set; }

    public DateTime DateTime { get; set; }

    public string Duration { get; set; }

    public virtual Rpm Rpm { get; set; }
}